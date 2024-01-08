const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ratingSchema=new Schema(
    {
        rating:{
            type:Number,
            required:true
        },
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        email:{
           type:String,
           required:true
        },
        feedback:{
            type:String,
            required:true
        },
        
    },
    { timestamps: true }
)

module.exports=mongoose.model('rating',ratingSchema);