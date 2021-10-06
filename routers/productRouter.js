import express from 'express'
const Router = express.Router()
import slugify from "slugify";
import { newProductValidation } from "../middlewares/productFormValidation.middleware.js";
import { getProducts, addProduct,getProductBySlug  } from '../models/product-model/Product.model.js';
import multer from "multer";



Router.get("/:slug?", async (req, res)=>{
    
    try {
        console.log(req.body)
        const {slug}= req.params
        console.log(req.params)
        const products = slug ? await getProductBySlug :await getProducts();
       /// 
       res.json({
           status: "success",
           message: "here is the product"
       }) 
    } catch (error) {
       res.status(500).json({
           status:"error",
           message: "Internal server error"
       }) 
    }
})
// configure multer for validation and upload destination
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        let error = null
        //validation test
        cb(error, "/public/img/products")
    },
    //group.png
    filename: function (req, file, cb) {
        const fileNameArg =  file.originalname.split(".")
        const fileName = slugify(fileNameArg[0], {lower:true})
        const fullFileName= fileName + "-" + Date.now() + "." + fileNameArg[1]
        cb(null,fullFileName)
    }
})

const upload = multer({storage})


//add new product
Router.post("/",upload.array("images", 5), 
newProductValidation, 
async(req, res)=>{
    try {
        console.log(req. files)

        //file zone
const files = req.files
const images = []
const basePath = `${req.protocol}://${req.get("host")}/public/img/products/}`
files.map(file => {
    const imgFullPath = basePath + file.filename
    images.push(imgFullPath)
})


        //
        const slug = slugify(req.body.title, { lower: true});
        const product = await addProduct({...defaultreq.body , slug, images})
       console.log(product)
       product?._id
       ?
       res.json({
           status: "success",
           message: "TODO, add new product"
       })
       : res.json({
           status: "error",
           message: "Unable to add the product , please try again later"
       }) 
    } catch (error) {
        console.log(error)
        if(error.message.includes("E1100 duplicate erro collection")){
            return res.json({
                status:"error",
                message:"Slug can not be same age for the existing product"
            })
        
        }
       res.status(500).json({
           status:"error",
           message: "internal server erro",
       }) 
    }
})
export default Router