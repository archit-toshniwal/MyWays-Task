const joi = require('joi');

const schemaValidate = (req,res,next) =>
{
    const joiSchema = joi.object({
        title:joi.string().required(),
        imageLink:joi.string().required(),
        content:joi.string().required()
    });
    const {error} = joiSchema.validate(req.body);
    if(error){
        //console.log(error);
        return next(error);
    }else{
        next();
    }
}



module.exports = schemaValidate;