import express from "express";
const Router = express.Router();

import { getUserByEmailAndRefreshToken} from'../models/user-model/User.model.js';
import { verifyRefreshJWT, createAccessJWT } from "../helpers/jwt.helper.js";
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
    
   



 

export default Router;