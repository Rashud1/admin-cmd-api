import express from 'express'
const Router = express.Router();
import {createUser, verifyEmail} from '../models/user-model/User.model.js';
import {createAdminUserValidation, adminEmailVerificationValidation} from '../middlewares/formValidation.middleware.js';
import {hashPassword} from '../helpers/bcrypt.helper.js';
import  {sendEmailVerificationConfirmation, sendEmailVerificationLink} from '../helpers/email.helper.js';
import { createUniqueEmailConfirmation, findAdminEmailVerification, deleteInfo } from '../models/user-model/session/Session.model.js';
 
 


Router.all("/", (req,res,next)=> {
 next();
});

Router.post("/", createAdminUserValidation, async (req, res)=> {
    
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
export default Router;