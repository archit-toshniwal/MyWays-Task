const joi = require('joi');
const Custom = require('../services/customErrorHandler');

function errorHandler(err,req,res,next)
{
     let statusCode = 500;
     let message = "Server error";
     if(err instanceof joi.ValidationError){
        statusCode = 422;
        message = err.message
     }
     else if(err instanceof Custom)
     {
        statusCode = err.statusCode;
        message = err.message;
     }

     res.status(statusCode).json({error:message});
}

module.exports = errorHandler;