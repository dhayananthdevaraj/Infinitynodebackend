const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const vacationRentalRouter = require("./routers/vactionRentalRouter");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};
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
