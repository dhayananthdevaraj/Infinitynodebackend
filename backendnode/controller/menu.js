const menuModel = require('../models/menu');

//adding a menu item
const addMenuItem= async (req,res,next)=>{
  
    try{
        let{name,category,subCategory,description,imgPath,status,price}=req.body
        if(name && category && status && price){
            console.log('req',req.body)
        await menuModel.insertMany([{
            name,
            category,
            subCategory,
            description,
            imgPath,
            status,
            price
        }])

        res.status(200).json({
            error:false,
            message:"menu item has been added successfully",
            data:null
        })
    }
    else{
        res.status(400).json({
            error:true,
            message:"please enter proper menu detail",           
            data:null
        })
    }
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request",           
        })  
       }
}

//editing a menu item
const editMenuItem= async (req,res,next)=>{
    try{
        let {name,category,subCategory,description,imgPath,status,price}= req.body;
        let {_id} = req.params;

        if(name && category && status && price){

        const menuItem= await menuModel.findOne({_id});
        if(menuItem){
        await menuModel.updateOne(
            {_id},{
                $set:{
                    name,
                    category,
                    subCategory,
                    description,
                    imgPath,
                    status,
                    price
                }
            }
        )
        }
        else{
            res.status(404).json({
                error:false,
                message:"menu item not found ",
            })
        }
        res.status(200).json(
            {
                error:false,
                message:"menu item has been updated successfully",
                data:null
            }
        )
        }
        else{
            res.status(400).json(
                {
                    error:false,
                    message:"menu item has been updated successfully",
                    data:null
                }
            )

        }
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request",           
        })  
    
    }
}

//getting all menu items
const getAllMenuItems= async (req,res,next)=>{
    try{
       const menuItems= await menuModel.find({});
       res.status(200).json({
           error:false,
           message:"all menu items",
           data:menuItems
       })
    }catch(err){
        res.status(400).json({
            error:true,
            message:"Bad request",           
        })  
    
    }
}


module.exports = {
    addMenuItem,
    editMenuItem,
    getAllMenuItems
}