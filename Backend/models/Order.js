const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: "Pizza"
  }
});
module.exports = mongoose.model("Order", orderSchema);