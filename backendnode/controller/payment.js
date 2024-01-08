

const fs = require('fs');

const paymentModel = require('../models/payment');

//making a payment against an order
const makePayment = async (req, res, next) => {
    try {
      let { paymentMode,orderId,customerId,email,customerName,paymentDesc,phNo,totalPrice,status } = req.body;
        await paymentModel.insertMany([
        {
            paymentMode,
            orderId,
            customerId,
            email,
            phNo,
            customerName,
            paymentDesc,
            totalPrice,
            status
        },
      ]);
      res.status(200).json({
        error: false,
        message: "payment has been made successfully",
        data: null,
      }); 
   
    } catch (err) {
      res.status(400).json({
        error:true,
        message:"Bad request",           
    })  
    }
  };

  //Getting all payment details

  const getAllPayments= async (req,res,next)=>{
    try{
       const payments= await paymentModel.find();
       res.status(200).json({
           error:false,
           message:"all payment detail",
           data:payments
       })
    }catch(err){
      res.status(400).json({
        error:true,
        message:"Bad request"         
    })  
    }
}




//--------------------------//

let paymentsData = [];

const dataFilePath = 'paymentsData.json';
if (fs.existsSync(dataFilePath)) {
  const rawData = fs.readFileSync(dataFilePath);
  paymentsData = JSON.parse(rawData);
}
async function makePayment_fs(req, res){
  try {
    const newPayment = req.body;
    paymentsData.push(newPayment);

    // Save the updated data to the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(paymentsData, null, 2));

    res.json({ message: 'Payment added successfully', data: newPayment });
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ error: 'Error adding payment' });
  }
}
async function getAllPayments_fs(req, res) {
  try {
    res.json(paymentsData);
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({ error: 'Error getting payments' });
  }
}
const getPaymentById_fs = (req, res) => {
  try {
    const paymentId = req.params.id;
    console.log("paymentId",paymentId);
    const payment = paymentsData.find((payment) => payment.id == paymentId);

    if (payment) {
      res.json({ message: 'Payment found', data: payment });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.error('Error getting payment by ID:', error);
    res.status(500).json({ error: 'Error getting payment by ID' });
  }
};
const deletePaymentById_fs = (req, res) => {
  try {
    const paymentId = req.params.id;
    const paymentIndex = paymentsData.findIndex((payment) => payment.id === paymentId);

    if (paymentIndex !== -1) {
      const deletedPayment = paymentsData.splice(paymentIndex, 1)[0];

      // Save the updated data to the JSON file
      fs.writeFileSync(dataFilePath, JSON.stringify(paymentsData, null, 2));

      res.json({ message: 'Payment deleted successfully', data: deletedPayment });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.error('Error deleting payment by ID:', error);
    res.status(500).json({ error: 'Error deleting payment by ID' });
  }
};


  module.exports = {
    makePayment,
    getAllPayments,
    getAllPayments_fs,
    makePayment_fs,
    getPaymentById_fs,
    deletePaymentById_fs
  }