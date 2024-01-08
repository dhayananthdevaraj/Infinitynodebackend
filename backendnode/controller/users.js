const userModel = require("../models/users");

const fs = require('fs');

//Registartion logic
const register = async (req, res, next) => {
  let { name, email, phoneNo, password, role } = req.body;
  try {
    const emailExits = await userModel.findOne({ email: email });

    if (emailExits) {
      res.json({
        error: true,
        message: "email already exits",
        data: null,
      });
    } else {
     
      await userModel.insertMany([
        {
          name,
          email,
          phoneNo,
          role,
          password,
        },
      ]);

      res.json({
        error: false,
        message: "User Registration Successfull",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

//login Logic

const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email });
    if (userData) {

      if (userData.password==password) {

        res.json({
          error: false,
          message: "Login Successfully",
          role: userData.role,
          email: userData.email,
          name: userData.name,
        });

      } else {
        res.json({
          error: true,
          message: "Invalid Password",
          data: null,
        });
      }
    } else {
      res.json({
        error: true,
        message: "User not registered",
        data: null,
      });
    }
  } catch (err) {

    res.status(400).json({
      error:true,
      message:"Bad request"         
  })  
  }
};


//Reset password
const resetPassword = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const user = await userModel.findOne({ email }).lean();
    if (user) {
      await userModel.updateOne(
        { email },
        {
          $set: {
            password: password,
          },
        }
      );
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
    res.json({
      error: false,
      message: "User Password has been updated successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      error:true,
      message:"Bad request"         
  })    }
};


//Getting all the users
const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({});

    if (user) {
      console.log("user", user);
      res.json({
        error: false,
        message: "All Users found successfully",
        data: user,
      });
    } else {
      res.json({
        error: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      error:true,
      message:"Bad request"         
  })    }
};


const usersData = [];
const dataFilePath = 'usersData.json';

// Read data from the JSON file if it exists
if (fs.existsSync(dataFilePath)) {
  const rawData = fs.readFileSync(dataFilePath);
  usersData.push(...JSON.parse(rawData));
}

// Registration logic using file system
const register_fs = async (req, res) => {
  try {
    const { name, email, phoneNo, password, role,id } = req.body;
    const emailExists = usersData.some((user) => user.email === email);

    if (emailExists) {
      res.json({
        error: true,
        message: 'Email already exists',
        data: null,
      });
    } else {
      const newUser = {
        id,
        name,
        email,
        phoneNo,
        role,
        password,
      };

      usersData.push(newUser);

      fs.writeFileSync(dataFilePath, JSON.stringify(usersData, null, 2));

      res.json({
        error: false,
        message: 'User Registration Successful',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Login logic using file system
const login_fs = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = usersData.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        res.json({
          error: false,
          message: 'Login Successfully',
          role: user.role,
          email: user.email,
          name: user.name,
        });
      } else {
        res.json({
          error: true,
          message: 'Invalid Password',
          data: null,
        });
      }
    } else {
      res.json({
        error: true,
        message: 'User not registered',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Reset password using file system
const resetPassword_fs = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userIndex = usersData.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      usersData[userIndex].password = password;
      fs.writeFileSync(dataFilePath, JSON.stringify(usersData, null, 2));
      res.json({
        error: false,
        message: 'User Password has been updated successfully',
        data: null,
      });
    } else {
      res.json({
        error: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Getting all users using file system
const getAllUsers_fs = (req, res) => {
  try {
    res.json({
      error: false,
      message: 'All Users found successfully',
      data: usersData.map((user) => ({ ...user, password: undefined })),
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


module.exports = {
  register,
  login,
  getAllUsers,
  resetPassword,


  register_fs,
  login_fs,
  getAllUsers_fs,
  resetPassword_fs,
};
