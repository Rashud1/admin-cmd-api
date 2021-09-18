import express from 'express'
const Router = express.Router();
import slugify from "slugify";

import { addCategory, getAllCats, getACat, deleteCat, updateCat } from "../models/user-model/category/Category.model.js";
import { newCategoryValidation, updateCategoryValidation } from "../middlewares/formValidation.middleware.js";

Router.all("/", (req,res,next)=> {
    next();

    // res.json({
    //     status:"success",
    //     message: "from catalog router",

    // });
   });

//return all or single categories
Router.get("/:_id?", async (req, res) =>{
    try {
        const {_id} = req.params;
        let result;
    
        if(_id){
            result = await getACat(_id);


        } else{
             result = await getAllCats();

        }
        

        res.json({
            status: "success",
            message: "All the categories",
            categories: result || [],
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            message: error.message
        })
    }


});





//    Create new caategory
Router.post("/", newCategoryValidation, async (req, res)=>{
    try {
        
        const slug = slugify(req.body.name, { lower: true});
        console.log(slug);

        const result = await addctaegory({...req.body, slug});



        const status = result?.id ? "success" : "error"
         const message = result?.id ? "Category has been created" : "Unable to create category";



        res.send({status, message});


        
    } catch (error) {
        console.log(error.message);

        let msg = "Error,unable to add new category at the moment";

         if( error.message.includes("E11000 duplicate key error collection")){
             msg = "Error, the category already exists";
         }

        res.send({
            status: error,
            message: "Error,unable to add new category at the moment",
        });
    }
});






//update category
Router.patch("/", updateCategoryValidation, async (req, res,) => {
    try{
        //update database
        const result = await updateCat(req.body);
            console.log(result);

            if(_id){
                return res.json({
                    status: "success",
                    message: "The category has been updated",
                });
            }
        
                res.json({
                    status: "error",
                    message: "no update",
                });
        }catch (error) {
        console.log(error);
        
        res.send({
            status: "error",
            message: "Error, unable to delete the category",
        });
            

 }
});



//delete category
Router.delete("/:_id", async (req, res)=>{
try {
    const {_id} = req.params

    
        const result = await deleteCat(_id);
        console.log(result);
          
        if(_id){
        return res.json({
            status: "success",
            message: "The category has been deleted",
        });
    }

        res.json({
            status: "error",
            message: "Invalid request",
        });
    
} catch (error) {
    console.log(error);
    res.send({
        status: "error",
        message: "Error, unable to delete the category",
    });
       
}
});

   export default Router;