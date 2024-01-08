const express=require('express');
const UserRouter=express.Router();

const userController=require('../controller/users');
const orderController = require('../controller/order');
const paymentController = require('../controller/payment');
const ratingController = require('../controller/ratings');
const tableController = require('../controller/table');

//Registration
UserRouter.post('/register',userController.register);

//LogIn
UserRouter.post('/login',userController.login);



//reset password
UserRouter.put('/resetPassword',userController.resetPassword);



UserRouter.post('/registerFs',userController.register_fs);

//LogIn
UserRouter.post('/loginFs',userController.login_fs);

//reset password
UserRouter.put('/resetPasswordFs',userController.resetPassword_fs);




//Creating the order
UserRouter.post('/order',orderController.createOrder);

//review the order
UserRouter.get('/order/review/:customerId',orderController.reviewOrder);

//making a payment
UserRouter.post('/payment',paymentController.makePayment);
UserRouter.post('/paymentFs',paymentController.makePayment_fs);

//feedback
UserRouter.post('/ratings',ratingController.addRatings)
UserRouter.get('/getAllRatings',ratingController.getAllRatings)

//booking a table
UserRouter.post('/bookTable',tableController.bookTable);



module.exports=UserRouter