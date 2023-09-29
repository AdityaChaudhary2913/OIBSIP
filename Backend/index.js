const express = require("express");
const app = express();
const userRoutes = require("./routes/auth");
const pizzaRoutes = require("./routes/pizza");
const paymentRoutes = require("./routes/payment")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
require("dotenv").config();
app.use(cors({
  origin:["http://localhost:3000", "https://oibsip-backend.onrender.com"],
  credentials:true
}));
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", userRoutes);
app.use("/pizza", pizzaRoutes);
app.use("/payment", paymentRoutes);

app.listen(8000, () => {
  console.log(`App is running at 8000`);
});
