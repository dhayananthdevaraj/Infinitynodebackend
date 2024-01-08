const jwt = require("jsonwebtoken");
SECRET_KEY = "TECHNOELEVATE";

// either user or admin
const authorizeUserAdmin = async (req, res, next) => {
  console.log(req.headers["authorization"]);
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = await jwt.verify(token, SECRET_KEY);
    if (payload.role === "user" || payload.role === "admin") {
      next();
    } else {
      res.status(401).json({
        error: true,
        message: "Not Authorized",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      error: true,
      message: "Bad Request",
      data: null,
    });
  }
};

//only admin

const authorizeAdmin = async (req, res, next) => {
  console.log(req.headers["authorization"]);
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = await jwt.verify(token, SECRET_KEY);
    if (payload.role === "admin") {
      next();
    } else {
      res.status(401).json({
        error: true,
        message: "Not Authorized",
        data: null,
      });
    }
  }
};
module.exports = {
  authorizeUserAdmin,
  authorizeAdmin,
};
