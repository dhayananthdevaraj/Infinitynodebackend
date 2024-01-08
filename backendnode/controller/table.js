const tableModel = require('../models/table');

//adding a table
const addTable= async (req,res,next)=>{
    try{
        console.log(req.body);
        let{tableNo,alloted,served,booked}=req.body
        if(tableNo[0]<16){
        await tableModel.insertMany([{
            tableNo:req.body.tableNo,
            alloted:req.body.alloted,
            served:req.body.served,
            booked:req.body.booked,
            // isAvailable:req.body.isAvailable

        }])
        console.log(req.body);
        res.status(200).json({
            error:false,
            message:"table has been added successfully",
            data:null
        })
    }
    else{
        res.status(400).json({
            error:true,
            message:"You have added maximum number of tables",
            data:null
        })
    }
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request"         
        })      }
}

//Getting the table status
const getAllTables= async (req,res,next)=>{
    try{
       const tables= await tableModel.find();
       res.status(200).json({
           error:false,
           message:"all table details",
           data:tables
       })
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request"         
        })      
    
    }
}

//Editing the table status
const editTableStatus= async (req,res,next)=>{
    try{
        let {_id,alloted,served,booked}=req.body;
        // console.log("flag",isAvailable);
        if(_id){
        await tableModel.updateOne(
            {_id},{
                $set:{
                    alloted,
                    served,
                    booked
                }
            }
        )
        res.status(200).json(
            {
                error:false,
                message:"table status has been updated successfully",
                data:null
            }
        )
        }
        
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request"         
        })      }
}

//Booking a table for the customer
const bookTable = async (req,res,next)=>{
    try{
        let {_id,bookingDate,bookingTime,booked}=req.body;
        console.log('update table', req.body);
        // console.log(isAvailable);
        if(_id){
            
        await tableModel.findByIdAndUpdate(
            {_id},{
                $set:{
                    bookingDate,
                    bookingTime,
                    booked,
                }
            },{upsert: true, returnOriginal: false}

        ) 
        const data =  await tableModel.findOne({ _id: _id })
        res.status(200).json(
            {
                error:false,
                message:"table booked successfully",
                data:data
            }
        )
        }
        else{
            res.status(400).json({
                error:true,
                message:"table has been added successfully",
                data:null
            })
        }
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request"         
        })    
      }
}

module.exports = {
    addTable,
    getAllTables,
    editTableStatus,
    bookTable
}