const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  base: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Base"
  },
  sauce: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Sauce"
  },
  cheese: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cheese"
  },
  veggies: [{
    type: String,
  }],
  image: {
    type : String,
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type : Number,
    default: 1
  }
});
module.exports = mongoose.model("Pizza", pizzaSchema);
