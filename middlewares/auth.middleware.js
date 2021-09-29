import {verifyAccessJWT} from '../helpers/jwt.helper.js'
import {  getUserById } from "../models/user-model/User.model.js";
import {  getSession } from "../models/session/Session.model.js";




export const isAdminUser = async (req, res, next) => {


    try {

        const { authorization } = req.headers;

        if(authorization){
            //1 validate the accessJWT
            const {decoded} = verifyAccessJWT(authorization);
            if(decoded === "jwt expired"){
                return res.status(403).json({
                    status:"error",
                    message: "jwt expired",
                });

            }
                  const session = email ? await getSession({ token : authorization }) : null;
            console.log(decoded, session);
           if(session?._id){
       

               const user = await getUserById(session.userId)
               
    
               if(user?.role === "admin"){
                
                req.user = user;
                req.user.password = undefined;
                req.user.refershJWT = undefined;

                next();
                return;
                
               }

               //get the admin user from the db and check for the role
           }  
           
        }
           return res.status(403).json({
                status:"error",
                message: "unauthorized"
            })

        
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
        message: "Server error"
        })
        
    }
};