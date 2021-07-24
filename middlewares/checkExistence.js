const blogs = require('../models/blog');
const users = require('../models/user');
const CustomError = require('../services/customErrorHandler');
const checkExists = {
    checkBeforeDelete: async (req,res,next) =>{
        const result = await blogs.exists({_id:req.body._id});
        if(result){
            next();
        }else{
            next(CustomError.requestDeclined(422,'item not found'));
        }
    },

    checkAlreadyExists: async(req,res,next) =>{
        const result = await users.exists({email:req.body.email});
        if(result){
            next(CustomError.alreadyExist(422,'email is already register with us')); 
        }else{
            next();
        }
    }
}

module.exports = checkExists;