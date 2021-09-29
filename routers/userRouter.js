import express from 'express'
const Router = express.Router();
import {createUser, verifyEmail, getUserByEmail, updateUserProfile, removeRefreshJWT} from '../models/user-model/User.model.js';
import {createAdminUserValidation, adminEmailVerificationValidation, loginUserFormValidation} from '../middlewares/formValidation.middleware.js';
import {comparePassword, hashPassword} from '../helpers/bcrypt.helper.js';
import  {sendEmailVerificationConfirmation, sendEmailVerificationLink} from '../helpers/email.helper.js';
import { createUniqueEmailConfirmation, findAdminEmailVerification, deleteInfo } from '../models/rest-pin/Pin.model.js';
import { removeSession } from "../models/session/Session.model.js";

 import {getJWTs} from '../helpers/jwt.helper.js';
import { isAdminUser } from '../middlewares/auth.middleware.js';


 


Router.all("/", (req,res,next)=> {
 next();
});



Router.get("/", isAdminUser, (req, res)=>{
res.json({
    status:"success",
    message:"User profile",
    user: req.user,

   
});
})


// Create user//
Router.post("/", isAdminUser, createAdminUserValidation, async (req, res)=> {
    
    try {
         //server side validation
         

        //encrypt password
        console.log(req.body)
        const hashPass  = hashPassword(req.body.password);
       
        if (hashPass) {
        req.body.password =hashPass;

        const {_id, fname, email} = await createUser(req.body);
        console.log(hashPass);

            if (_id) {

            const {pin} = await createUniqueEmailConfirmation(email);  

          //    (we are putting info? for,just in case, if we get null and then we can send link to the email user and call our database
             
          if (pin) {
            const forSendingEmail = {
                fname,
                email,
                pin,
            };
           sendEmailVerificationLink(forSendingEmail);
         }
         return res.json({
            status: "success",
            message:"New user has been created successfullty! We have send an email confirmation to your email. Please check your email and follow the instraructions to activateyour acccount",

         });
      }
     }
        res.json({
        status: "error",
        message:"the user has not been created successfully"
        })
    
        
    } catch (error) {
        let msg = " Error, unable to create user"
        console.log(error);
        if(error.message.includes("E11000 duplicate key error collection")){
            msg="This email has been already in iused by another user"

        }
        res.json({
            statusbar: "error",
            message: "error,unable to create new user",

        })

    
    }
});

//update user
Router.patch("/",  isAdminUser, async (req, res)=>{
    try {
        const {_id} = req.user
        console.log(_id, req.body)
         if(_id){
             const result = await updateUserProfile(_id, req.body)

             if(result?.id){
               return   res.json({
                status: "success",
                message: "User profile has been updated successfully",
            })
             }
         }
          return res.json({
            status: "error",
            message: "Unable to update the user, please try again later",
        });
        
        
    } catch (error) {
        console.log(error)
        
    }
})




////email verification
Router.patch("/email-verfication", adminEmailVerificationValidation, async (req, res) => {
    try {
        const result = await findAdminEmailVerification(req.body);

        
        if (result?._id){
            //TO DO
            //Information is valid now we can update teh user
           const data = await verifyEmail(result.email);

          
            if (data?._id){
                //delete the session info
                deleteInfo(req.body);
               
            //send email confirmation to the user
            sendEmailVerificationConfirmation({
                fname: data.fname,
                email: data.email,
            });
            
            
            return res.json({
                status: "success",
                message: "Your email has been verified,you may log in now",
            });
        }
        }
        res.json({
            status: "error",
            message:"Unable to verify your email, either the link is invalid or expired",
        });

    } catch (error) {
        res.json({
            status: "error",
            message: "Error, unable to verify the email.Please try again later",
        })
        
    }
});

//user login
Router.post("/login", loginUserFormValidation, async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await getUserByEmail(email);

        console.log(user);
        if (user?._id && user?.role === 'admin'){

            ///check if password valid or not

            const isPassMatch = comparePassword(password, user.password);
            if(isPassMatch){
              //get jwts then send to the client

                const jwts = getJWTs({_id:user._id, email:user.email});
                // user.password = undefined;//

                return res.status(401).json({
                    status: "success",
                    message: "login success",
                    jwts,
                    user,
                });

            }
        }

        res.status(401).json({
            status: "error",
            message: "login unsuccessful",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Error, please try again later"
        });
    };
});
//userlog out
Router.post("/logout", async (req, res)=>{

    try {
        const {accessJWT, refreshJWT} = req.body;
        
     
          accessJWT && (await removeSession(accessJWT));
         refreshJWT && (await removeRefreshJWT(refreshJWT));
        
         console.log(a, b);
      
              res.json({
                    status: "success",
                    message: "login out",
                    
                });

     } catch (error){
         console.log(error);
         res.status(500).json({
            status: "error",
            message: "login unsuccessful",
        });
    
        
     };
   });

        
    

export default Router;