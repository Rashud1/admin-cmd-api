import express from "express";
const Router = express.Router();

import { getUserByEmailAndRefreshToken, getUserByEmail} from'../models/user-model/User.model.js';
import { verifyRefreshJWT, createAccessJWT } from "../helpers/jwt.helper.js";
import { createUniqueOtp } from "../models/rest-pin/Pin.model.js";
import { sendPasswordResetOTP } from "../helpers/email.helper.js";


Router.all("/", (req, res, next)=>{
    console.log("token got it")
next();
})

Router.get("/", async (req, res)=>{
    try {
        const {authorization} = req.headers;
         //1. check if the token is valid
        const { email } = verifyRefreshJWT(authorization);
        

        //2. get the user info
        if(email){
            //get user ID from db  by email

            const filter ={
                email,
                refreshJWT : authorization,
            };
            const user = await getUserByEmailAndRefreshToken(filter)
            if(user?._id){
                const accessJWT = await createAccessJWT ({_id:user._id, email})
                
                return res.json({
                    accessJWT,
                })

            }

        }

    
        res.json({
            status: "success",
            message:"send new token",
    });
 } catch (error) {
     console.log(error);
        res.status(401).json({
            status: "error",
            message:"Unauthenticated",
    });
}
});
    
   



 // request OTP for password reset
 Router.post("/request-otp", async (req, res)=>{
    try {
          //get the email
        const {email} = req.body
  
        //get the user by email
        if(email){
            const user = await getUserByEmail(email)

            if(user?._id){

            
        //create a otp and store in the token table along with the user id
        const result = await createUniqueOtp ({email, type: "passwordResetOtp"})
        if(!result?._id){
            return res.json({
                status: "error",
                message:"Please try agin later",
        });

        }
        //send email with the otp and then
        const emailObj = {
            email,
            otp: result.pin,
            fname: user.fname,

        }
        sendPasswordResetOTP(emailObj)
     
        
            }
        }
        res.json({
            status: "success",
            message:"If the email is exist in our system, we will send you an OTP shortly.Otp will expire in 15 min",
    });
 } catch (error) {
     console.log(error);
        res.json({
            status: "error",
            message:"Error, unable to process your request",
    });
}
}
    );

export default Router;