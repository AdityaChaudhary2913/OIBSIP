const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  base: {
    type: String,
    required: true,
    trim: true,
    ref: "Base"
  },
  sauce: {
    type: String,
    required: true,
    trim: true,
    ref: "Sauce"
    //enum: ["Pesto", "Creamy Alfredo", "Mayonnaise", "Robust", "Tomato"]
  },
  cheese: {
    type: String,
    required: true,
    trim: true,
    ref: "Cheese"
    //enum: ["Mozzarella", "Gorgonzola", "Provolone", "Parmigiano-Reggiano", "Aged Havarti"]
  },
  veggies: [{
    type: String,
  }],
  image: {
    type : String,
  },
});
module.exports = mongoose.model("Pizza", pizzaSchema);
