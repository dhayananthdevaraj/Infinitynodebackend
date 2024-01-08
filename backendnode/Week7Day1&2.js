    
    
    const fs = require('fs');
    const Readable = require('stream').Readable;

    const dataArray = [];

const addData = (userData, callback) => {
    try {
        dataArray.push(userData);
        if (callback && typeof callback === 'function') {
        callback(null, userData);
        }
    } catch (error) {
        console.error(error);
        console.log('Error adding user.');
        if (callback && typeof callback === 'function') {
        callback(error);
        }
    }
    };

const displayData = () => {
      console.log('Users in the array:');
      dataArray.forEach((user, index) => {
          console.log(`${index + 1}. ${JSON.stringify(user)}`);
      });
      };

const callbackFunction = (err, addedUserData) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Callback: User added successfully:', JSON.stringify(addedUserData));
    }
    };
    // Test the functions with callback
    addData({
    name: 'John',
    email: 'john@example.com',
    phoneNo: '1234567890',
    password: 'securepassword',
    role: 'user',
    }, callbackFunction);

    addData({
    name: 'Alice',
    email: 'alice@example.com',
    phoneNo: '9876543210',
    password: 'anotherpassword',
    role: 'admin',
    }, callbackFunction);
    displayData();


    // day 2:

    const writeDataToFile = () => {
        const writeStream = fs.createWriteStream('userData.json');
      
        writeStream.write('[');
        dataArray.forEach((user, index) => {
          const comma = index === 0 ? '' : ',';
          writeStream.write(`${comma}\n${JSON.stringify(user)}`);
        });
        writeStream.write('\n]');
        writeStream.end();
      
        console.log('Data has been written to userData.json using streams');
      };
    const readDataAndPrint = () => {
        const readStream = fs.createReadStream('userData.json', 'utf8');
      
        let fileData = '';
        readStream.on('data', (chunk) => {
          fileData += chunk;
        });
      
        readStream.on('end', () => {
          const readData = JSON.parse(fileData);
      
          console.log('Read data from userData.json using streams:');
          readData.forEach((user, index) => {
            console.log(`${index + 1}. ${JSON.stringify(user)}`);
          });
        });
      
        readStream.on('error', (error) => {
          console.error('Error reading file:', error.message);
        });
      };
      



writeDataToFile();

readDataAndPrint();

module.exports = {
writeDataToFile,
readDataAndPrint,
callbackFunction,
addData,
displayData
}