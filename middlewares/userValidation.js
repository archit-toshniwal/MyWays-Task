const joi = require('joi');


const  userValidation = {
    registerValidation: async (req,res,next) =>{
        const registerSchemaJoi = joi.object({
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            phone_no:joi.number().required(),
            password:joi.string().required(),
            confirmPassword:joi.ref('password')
        });
        const {error} = registerSchemaJoi.validate(req.body);
        if(error){
            return next(error);
        }else{
            next();
        }
    }
}



module.exports = userValidation;