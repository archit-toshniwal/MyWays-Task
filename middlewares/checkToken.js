const jwtoken = require('jsonwebtoken');
const envController = require('../services/envController');

let secret = `${envController.secret}`;

const checktoken = async (req,res,next) =>{
    const {jwt} = req.cookies || null;
    if(jwt==null){
        res.status(400).json({status:false});
    }else{
          let decoded;
          try 
          {
            decoded = jwtoken.verify(jwt,secret);
          } catch(err) 
          {
            return next(err);
          }
        
          next();
       
     
    }
}


module.exports = checktoken;
