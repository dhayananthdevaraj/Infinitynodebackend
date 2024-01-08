const orderModel = require("../models/order");

//creating an order from the cart
const createOrder = async (req, res, next) => {
  try {
    let { menuItems, customerId, description, totalPrice,tableNo,status } = req.body;
    await orderModel.insertMany([
      {
        menuItems,
        customerId,
        description,
        totalPrice,
        tableNo,
        status
      },
    ]);
    res.status(200).json({
      error: false,
      message: "order has been placed successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      error:true,
      message:"Bad request",           
  })    }
};
//Review order for customer
const reviewOrder= async (req,res,next)=>{
    try{
        let {customerId} = req.params;

        const order= await orderModel.findOne({customerId});
        if(order){
            res.status(200).json(
                {
                    error:false,
                    message:"order found successfully",
                    data:order
                }
            )
        }
        else{
            res.status(404).json({
                error:false,
                message:"order not found",
            })
        }
        
    }catch(err){
      res.status(400).json({
        error:true,
        message:"Bad request",           
    })      }
}

module.exports = {
    createOrder,
    reviewOrder
}
