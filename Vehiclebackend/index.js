const express = require("express");
const mongoose = require("mongoose");
// const bookRoutes = require("./routers/bookRouter");
const userRouter = require("./routers/userRouter");
const vacationRentalRouter = require("./routers/vactionRentalRouter");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors"); // Import the cors package
const corsOptions = {
  origin: "*", // Replace with the URL of your frontend application
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};
app.use(bodyParser.json({ limit: '10mb' })); // Set the limit to 10MB for JSON payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Set the limit to 10MB for URL-encoded payloads


// Enable CORS with the specified options
app.use(cors(corsOptions));
mongoose
  .connect("mongodb://127.0.0.1:27017/vacationdb")
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {
      console.log("API is running in PORT:8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
  app.use("/user", userRouter);
  app.use("/vacation", vacationRentalRouter);

