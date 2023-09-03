const mongoose = require("mongoose");

const sauceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type : Number,
    default: 0
  }
});
module.exports = mongoose.model("Sauce", sauceSchema);