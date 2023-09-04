const mongoose = require("mongoose");

const cheeseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type : Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("Cheese", cheeseSchema);