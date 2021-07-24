const users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const envController = require('../services/envController');

let time = 3*24*60*60;

const registerController = {
       getRegister:async(req,res,next)=>{
        try
     {
         let pass;
            try{
                const salt = await bcrypt.genSalt();
                pass = await bcrypt.hash(req.body.password,salt);
            }
            catch(bcrypt_error){
                return next(bcrypt_error);
                
            }   
        //  console.log(pass);
        const user_ = new users({
            name:req.body.name,
            email:req.body.email,
            phone_no:req.body.phone_no,
            password:pass
        });
        

        //console.log(req.body);
        const result = await user_.save();
        const {_id} = result;
        if(!result){
            res.status(200).json({error:'registration failed'});
        }

       // console.log('yes');
        let secret = `${envController.secret}`;
        try{
        const token =  jwt.sign({_id},secret,{expiresIn:time});
        //res.cookie(jwt,token);
        res.cookie("jwt",token,{httpOnly:true,maxAge:time*100});
        res.status(200).json({msg:'cookie set',_id,status:true});

        }
        catch(jwterror){
            //console.log(jwterror);
            next(jwterror);
        }


      
     }
     catch(error)
     {
            console.log(error);
            next(error);
     }
    }
}

module.exports = registerController;