const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  imgPath: {
    type: String,
  },
  price: {
    type: Number,
  },

});

module.exports = mongoose.model("menu", menuSchema);
