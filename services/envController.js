require('dotenv').config();

const envController = {
    connectionString:()=>{
        return process.env.connectionString;
    },
    port:()  =>{
        return process.env.port;
    },
    secret:()=>{
        return process.env.secret;
    }
}


module.exports = envController;