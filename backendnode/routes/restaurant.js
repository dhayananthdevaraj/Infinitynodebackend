const express=require('express');
const restaurantRouter=express.Router();

const menuController = require('../controller/menu');
const tableController = require('../controller/table');
const userController = require('../controller/users');
const paymentController = require('../controller/payment');


//Adding a menu item
restaurantRouter.post('/addMenu',menuController.addMenuItem);
//Editing menu items
restaurantRouter.put('/editMenu/:_id',menuController.editMenuItem);
//Getting all menu items
restaurantRouter.get('/getAllMenu',menuController.getAllMenuItems);


//Adding a table
restaurantRouter.post('/addTable',tableController.addTable);
//Getting table status
restaurantRouter.get('/table',tableController.getAllTables);
//editing the table status
restaurantRouter.put('/table/editStatus',tableController.editTableStatus);

//Getting all users accounts
restaurantRouter.get('/getAllUsers',userController.getAllUsers);
restaurantRouter.get('/getAllUsersFs',userController.getAllUsers_fs);

//Getting all payment details
restaurantRouter.get('/getAllPayments',paymentController.getAllPayments);
restaurantRouter.get('/getAllPaymentsFs',paymentController.getAllPayments_fs);
restaurantRouter.delete('/deletePaymentById_fs',paymentController.deletePaymentById_fs);
restaurantRouter.get('/getPaymentById_fs/:id',paymentController.getPaymentById_fs);


module.exports = restaurantRouter;
