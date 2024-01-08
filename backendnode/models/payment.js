const mongoose=require('mongoose')
const Schema=mongoose.Schema

const paymentSchema=new Schema(
    {
        paymentMode:{
            type:String,
        },
        orderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        },
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        email:{
            type:String,
        },
        customerName:{
            type:String,
        },
        paymentDesc:{
            type:String,
        },
        phNo:{
            type:String,
        },
        totalPrice:{
            type:Number,
        },
        status:{
            type:String,
        },
        
    },
    { timestamps: true }

)

module.exports=mongoose.model('payment',paymentSchema);