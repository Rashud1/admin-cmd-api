import Joi from 'joi';


const painShortStr = Joi.string().max(20).required();
const longStr = Joi.string().max(3000).alphanum().required();
const shortStrNull = Joi.string().max(50).allow(null).allow("");
const _id = Joi.string().max(30);

const title = Joi.string().max(100).required();
const price = Joi.number().max(10000);
const date = Joi.date();
const qty =  Joi.number().max(10000);



export const newProductValidation = (req, res, next) =>{
    try {
        console.log(req.body)

        const schema = Joi.object({
            status: Joi.boolean(),
            title,
     price: price.required(),
     salePrice:price,
     saleStartDate:date.allow("").allow(null),
     saleEndDate: date.allow("").allow(null),
     brand:shortStrNull,
     qty:qty.required(),
     description:longStr.required(),
     category: Joi.string(),
        })


        const values = schema.validate(req.body)
        if(values.error){
            return res.json({
                status: "error",
                message: values.error.message
            })
        }
       next(); 
    } catch (error) {
        res.status(500).json({
            status: "error",
            message:"Internal server error"
        })
    }
}