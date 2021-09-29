import Joi from 'joi';


const painShortStr = Joi.string().max(20).required();
const shortStr = Joi.string().max(20).alphanum().required();
const email = Joi.string().max(50).email({ minDomainSegments: 2 }).required();
const shortStrNull = Joi.string().max(30).allow(null).allow("");
const _id = Joi.string().max(30);

export const createAdminUserValidation = (req,res,next) =>{
console.log(req.body);
    // console.log("hot validation function ");
const schema = Joi.object({
fname: shortStr,
lname: shortStr,
email: email,
password: Joi.string().min(8).required(),
phone: Joi.string().min(15),
address: Joi.string().max(100),
dob: Joi.date() .allow(null).allow(""),
gender: Joi.string().max(6),
});

const value = schema.validate(req.body)
console.log(req.body)
if(value.error){
    return res.json({
        status: "error",
        message: value.error.message,
    });
}
    next();

};

export const adminEmailVerificationValidation = (req, res, next) =>{
    const schema = Joi.object({
        
        email: email,
        pin: Joi.string().min(6).required(),
       });
        
        const value = schema.validate(req.body)
        console.log(value)
        if(value.error){
            return res.json({
                status: "error",
                message: value.error.message,
            });
        }
            next();

};

export const newCategoryValidation = (req, res, next) =>{
    try {
        const schema = Joi.object({
            name: painShortStr ,
            parentCat: shortStrNull,
        })




        const value = schema.validate(req.body);
        if(value.error){
        return res.json({
        status: "error",
        message: value.error.message,
       });
    }
    next();

    } catch (error) {
        return res.json({
            status: "error",
            message: value.error.message,
        });
    }
}


export const updateCategoryValidation = (req, res, next) =>{
    try {
        const schema = Joi.object({
            _id: _id.required,
            name: plainShortStr ,
            parentCat: shortStrNull,
        });




        const value = schema.validate(req.body);
        if(value.error){
        return res.json({
        status: "error",
        message: value.error.message,
       });
    }

    next();

    } catch (error) {
        return res.json({
            status: "error",
            message: value.error.message,
        });
    }
}

export const loginUserFormValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
           
            email: email ,
            password: plainShortStr,
        });
        const { error } = schema.validate(req.body);

        if(error){
        return res.json({
        status: "error",
        message: value.error.message,
       });
    }
} catch (error)
{
    res.json({
        status: "error",
        message: "error, unable to process your request",
    });
}

};