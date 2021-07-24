
const blogs = require('../models/blog');
const CustomError = require('../services/customErrorHandler');



const blogController = {
    getBlogs : async (req,res,next)=>{
            try
            {
               
                const blogDocuments = await blogs.find({});
                if(blogDocuments){
                    res.status(200).json({docs:blogDocuments});
                }else{
                    res.status(200).json({msg:'db is empty'});
                }
            }
            catch(error)
            {
                next(error);
            }
    },
    postBlog: async (req,res,next) =>{
        try
        {
            //console.log(req.body);
            const blog = new blogs({
                title:req.body.title,
                imageLink:req.body.imageLink,
                content:req.body.content
            });

            const result = await blog.save();
            if(result){
                res.status(200).json({msg:'inserted',result});
            }else{
                res.status(422).json({msg:'unprocessed entity'});
            }
        }
        catch(error)
        {
            //console.log(error);
            return next(error);
        } 
    },
    deleteBlog: async (req,res,next) =>{
        try
        {
        
        const status = await blogs.deleteOne({_id:req.body._id}) ;
        if(status){
                res.status(200).json({msg:'blog deleted'});
            }
        }
        catch(error){
            return next(error);
        }
    },
    updateBlog: async (req,res,next)=> 
    {
        try
        {
        const result = await blogs.updateOne({_id:req.body._id},{$set:req.body});
        if(result){
            res.status(200).json({msg:'document updated'});
            }
        }
        catch(error){
            return next(error);
        }
    }
}

module.exports = blogController;