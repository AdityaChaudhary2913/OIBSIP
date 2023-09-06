const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: "Pizza"
  },
  status: {
    type: String,
    default: "Order Received"
  }
});
module.exports = mongoose.model("Order", orderSchema);