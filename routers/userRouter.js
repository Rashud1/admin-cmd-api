import express from 'express'
const Router = express.Router();
import {createUser} from '../models/user-model/User.model.js';
import {createAdminUserValidation} from '../middlewares/formValidation.middleware.js';
import {hashPassword} from '../helpers/bcrypt.helper.js';

Router.all("/", (req,res,next)=> {
    console.log("from user router");

    next();
});

Router.post("/", createAdminUserValidation, async (req, res)=> {
    console.log(req.body);
    try {
        
    
        //server side validation

        //encrypt password
        const hashPass  = hashPassword(req.body.password);
        if(hashPass){
        req.body.password =hashPass;
        console.log(hashPass);


        const result = await createUser(req.body);

        if (result?._id) {
        // TO DO
        //cretae unique activation link and email link to the email user

        return res.json({
            state: "success",
            message:"New user has been created successfullty! We have send an email confirmation to your email. Please check your email and follow the instraructions to activateyour acccount",

        });
      }
     }
        res.json({
        state: "error",
        message:"the user has not been created successfully"
        })
    
        
    } catch (error) {
        let msg = " Error, unable to create user"
        console.log(error.message);
        if(error.message.includes("E11000 duplicate key error collection")){
            msg="This email has been already in iused by another user"

        }
        res.json({
            state: "error",
            message: "error,unable to create new user",

        }

        )

    
    }
});

export default Router;