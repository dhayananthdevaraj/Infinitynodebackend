const mongoose=require('mongoose')
const Schema=mongoose.Schema

const tableSchema=new Schema(
    {
        tableNo:[{
            type:Number,
        }],
        alloted:{
            type:Boolean,
        },
        served:{
            type:Boolean,
        },
        booked:{
            type:Boolean,
        },
        bookingDate:{
            type:String,
        },
        bookingTime:{
            type:String,
        },
        isAvailable:{
            type:Boolean,
            required:true,
            default:true
        }
    }
)

module.exports=mongoose.model('table',tableSchema);