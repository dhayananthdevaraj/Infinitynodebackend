const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderSchema=new Schema(
    {
        menuItems:{
            type:Array,
        },
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        description:{
            type:String,
        },
        totalPrice:{
            type:Number,
        },
        tableNo:[{
            type:Number,
        }],
        status:{
            type:String,
        },
        paymentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Payment"
        },
    }
)

module.exports=mongoose.model('order',orderSchema);