const logins = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const envController = require('../services/envController');
const Custom  = require('../services/customErrorHandler');


let time = 3*24*60*60;

const loginController = {
    getlogin : async (req,res,next) =>{
           const User = await logins.findOne({email:req.body.email});  
           //console.log(User);
           if(!User){
                return next(Custom.UserNotFound(422,'user not found'));
           }
          
           const status = await bcrypt.compare(req.body.password,User.password); 
           if(!status){
            return next(Custom.UserNotFound(422,'wrong password'));
           } 

           const {_id} = User;
           let secret = `${envController.secret}`;
           
           try{
           const token =  await jwt.sign({_id},secret,{expiresIn:time});
           res.cookie("jwt",token,{httpOnly:true,maxAge:time*100});
           res.status(200).json({msg:'cookie set',_id,status:true});
   
           }
           catch(jwterror){
               console.log(jwterror);
               next(jwterror);
           }


    }
}


module.exports = loginController;