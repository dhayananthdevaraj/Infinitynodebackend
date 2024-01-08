const fs = require('fs');

const paymentsArray = [
    {
      id:1,
      paymentMode: 'Credit Card',
      orderId: 1, // Replace with a valid order ID
      customerId: 2, // Replace with a valid user ID
      email: 'john@example.com',
      customerName: 'John Doe',
      paymentDesc: 'Payment for order #123',
      phNo: '1234567890',
      totalPrice: 100.50,
      status: 'Success',
    },
    {
        id:2,
      paymentMode: 'PayPal',
      orderId: 2, // Replace with a valid order ID
      customerId: 2, // Replace with a valid user ID
      email: 'alice@example.com',
      customerName: 'Alice Smith',
      paymentDesc: 'Payment for order #456',
      phNo: '9876543210',
      totalPrice: 75.25,
      status: 'Pending',
    },
  ];
  
const writeDataToFileUsingfileSystem = () => {
    const jsonString = JSON.stringify(paymentsArray, null, 2);
    fs.writeFileSync('paymentsData.json', jsonString, 'utf8');
    console.log('Data has been written to paymentsData.json');
  };
const readDataAndPrintUsingfileSystem = () => {
    try {
      const fileData = fs.readFileSync('paymentsData.json', 'utf8');
      const readData = JSON.parse(fileData);
  
      console.log('Read data from paymentsArray.json:');
      readData.forEach((user, index) => {
        console.log(`${index + 1}. ${JSON.stringify(user)}`);
      });
    } catch (error) {
      console.error('Error reading file:', error.message);
    }
};

writeDataToFileUsingfileSystem()
readDataAndPrintUsingfileSystem()

module.exports={
  writeDataToFileUsingfileSystem,
  readDataAndPrintUsingfileSystem
}