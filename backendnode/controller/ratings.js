const ratingModel = require('../models/rating');

//adding feedback and rating from customer
const addRatings= async (req,res,next)=>{
    try{
        let{customerId,email,rating,feedback}=req.body
        await ratingModel.insertMany([{
            customerId,
            email,
            rating,
            feedback
        }])
        res.status(200).json({
            error:false,
            message:"rating has been received successfully",
            data:null
        })
    }catch(err){

        res.status(400).json({
            error:true,
            message:"Bad request"         
        })  
    }
}
const getAllRatings= async (req,res,next)=>{
    try{
       const rating= await ratingModel.find();
       res.status(200).json({
           error:false,
           message:"All rating details",
           data:rating
       })
    }catch(err){

        res.status(400).json({
            error:true,
            message:"Bad request"         
        })  
    }
}
module.exports = {
    addRatings,
    getAllRatings
}