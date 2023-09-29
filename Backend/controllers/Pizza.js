const Base = require("../models/Base");
const Cheese = require("../models/Cheese");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Sauce = require("../models/Sauce");
const Veggies = require("../models/Veggies");
const mailSender = require("./mailSender");


exports.createPizza = async (req, res) => {
  try{
    //Fetch data
    const { name, base, cheese, sauce, veggies, quantity } = req.body;

    //Validations
    if(!name || !base || !cheese  || !sauce || !quantity ){
      return res.status(400).json({
        success:false,
        message:"Please provide every detail for the Pizza"
      });
    }

    const calculatePrice = async () => {
      let totalPrice = 0;
      // Fetch prices for selected ingredients
      const basePrice = (await Base.findOne({ name: base }))?.price || 0;
      const cheesePrice = (await Cheese.findOne({ name: cheese }))?.price || 0;
      const saucePrice = (await Sauce.findOne({ name: sauce }))?.price || 0;
      let veggiesPrice = 0;
      for (const veggie of veggies) {
        const veggiePrice = (await Veggies.findOne({ name: veggie }))?.price || 0;
        veggiesPrice += veggiePrice;
      }
      // Calculate totala price
      totalPrice = basePrice + cheesePrice + saucePrice + veggiesPrice;
      return totalPrice;
    };
    // Calculate the price
    const price = await calculatePrice();

    const baseD = (await Base.findOne({ name: base }));
    const cheeseD = (await Cheese.findOne({ name: cheese }));
    const sauceD = (await Sauce.findOne({ name: sauce }));
    //Create entry in Database
    const pizzaDetail = await Pizza.create({
      name:name,
      base:baseD._id,
      cheese:cheeseD._id,
      sauce:sauceD._id,
      veggies:veggies,
      image:"https://imgs.search.brave.com/P2iwCfiBAJTpApYBHRRlazxM5JyG3rsrUVypsJg0oPA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzU3Lzg0Lzkw/LzM2MF9GXzU3ODQ5/MDgyX1RaYTdxOGxJ/UktYQ2dKcXNpdTRw/MDlwbU44RmtQMklp/LmpwZw",
      price:price,
      quantity:quantity
    })
    const baseDetails = await Base.findOneAndUpdate(
      { name: base },
      { $inc: { quantity: -1 } }
    );
    if(baseDetails?.quantity < 20){
      await mailSender("theaditya1985@gmail.com", "Scarcity of Stock", `Please Add some more bases for ${baseDetails.name} type as it is less than 20`)
    }

    const cheeseDetails = await Cheese.findOneAndUpdate(
      { name: cheese },
      { $inc: { quantity: -1 } }
    );
    if(cheeseDetails?.quantity < 20){
      await mailSender("theaditya1985@gmail.com", "Scarcity of Stock", `Please Add some more cheese for ${cheeseDetails.name} type as it is less than 20`)
    }

    const sauceDetails = await Sauce.findOneAndUpdate(
      { name: sauce },
      { $inc: { quantity: -1 } }
    );
    if(sauceDetails?.quantity < 20){
      await mailSender("theaditya1985@gmail.com", "Scarcity of Stock", `Please Add some more sauce for ${sauceDetails.name} type as it is less than 20`)
    }

    const veggieDetails = await Veggies.findOneAndUpdate(
      { name: veggies },
      { $inc: { quantity: -1 } }
    );
    if(veggieDetails?.quantity < 20){
      await mailSender("theaditya1985@gmail.com", "Scarcity of Stock", `Please Add some more veggies for ${veggieDetails.name} type as it is less than 20`)
    }
    
    //Returning response
    return res.status(201).json({
      success:true,
      message:"Pizza added successfully",
      data:pizzaDetail
    });
  } catch(err){
    // console.log(err)
    res.status(500).json({
      success:false,
      message:"Error while adding Pizza!"
    })
  }
}

//GetAll tag handler function
exports.fetchAllPizza = async (req, res) => {
  try{
    const allPizza=await Pizza.find({}, {name:true, base:true, cheese:true, sauce:true, veggie:true, image:true, price:true, quantity:true}).populate("veggies").populate("cheese").populate("base").populate("sauce").exec();
    return res.status(200).json({
      success:true,
      message:"All Pizza fetched successfully",
      data:allPizza
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching Pizza!",
    });
  }
}

exports.priceCalculator = async (req, res) => {
  try{
    const { name, base, cheese, sauce, veggies, quantity } = req.body;
    //Validations
    if(!name || !base || !cheese  || !sauce || !quantity ){
      return res.status(400).json({
        success:false,
        message:"Please provide every detail for the Pizza"
      });
    }
    console.log("Testing")
    const calculatePrice = async () => {
      let totalPrice = 0;
      // Fetch prices for selected ingredients
      const basePrice = (await Base.findOne({ name: base }))?.price || 0;
      const cheesePrice = (await Cheese.findOne({ name: cheese }))?.price || 0;
      const saucePrice = (await Sauce.findOne({ name: sauce }))?.price || 0;
      let veggiesPrice = 0;
      for (const veggie of veggies) {
        const veggiePrice = (await Veggies.findOne({ name: veggie }))?.price || 0;
        veggiesPrice += veggiePrice;
      }
      // Calculate total price
      totalPrice = basePrice + cheesePrice + saucePrice + veggiesPrice;
      return totalPrice*quantity;
    };
    // Calculate the price
    const price = await calculatePrice();
    return res.status(200).json({
      success:true,
      message:"Price of pizza calculated",
      price
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while calculating price!",
    });
  }
}

exports.placeOrder = async (req, res) => {
  try{
    console.log(req.body)
    const orderDetails = await Order.create({
      user:req.body.userId,
      pizza:req.body.pizzaId
    })
    const order = await Order.findOne({user:req.body.userId, pizza:req.body.pizzaId}).populate("user").populate("pizza")
    const mailResponse = await mailSender("theaditya1985@gmail.com", "New Order", order)
    return res.status(200).json({
      success:true,
      message:"Order Placed",
      order
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while placing order!",
    });
  }
}

exports.getMyOrders = async (req, res) => {
  try{
    const { id } = req.user;
    const order = await Order.find({user:id}).populate("user").populate("pizza")
    console.log(order)
    return res.status(200).json({
      success:true,
      message:"Order Fetched",
      order
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching order"
    })
}
}

exports.getOrders = async (req, res) => {
  try{
    const {firstName, lastName, email} = req.user;
    const order = await Order.find({}, {user:true, pizza:true, status:true}).populate("user").populate("pizza")
    return res.status(200).json({
      success:true,
      message:"Order Fetched",
      order,
      firstName,
      lastName,
      email
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching order!",
    });
  }
}

exports.deleteOrder = async (req, res) => {
  try{
    const {id} = req.body;
    const order=await Order.findByIdAndDelete(id);
    return res.status(200).json({
      success:true,
      message:"Order deleted",
      order
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while deleting order!",
    });
  }
}