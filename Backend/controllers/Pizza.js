const Base = require("../models/Base");
const Cheese = require("../models/Cheese");
const Pizza = require("../models/Pizza");
const Sauce = require("../models/Sauce");
const Veggies = require("../models/Veggies");
const mailSender = require("./mailSender");


exports.createPizza = async (req, res) => {
  try{
    //Fetch data
    const { name, base, cheese, sauce, veggies, image } = req.body;

    //Validations
    if(!name || !base || !cheese  || !sauce ){
      return res.status(400).json({
        success:false,
        message:"Please provide every detail for the Pizza"
      });
    }

    //Create entry in Database
    const pizzaDetail = await Pizza.create({
      name:name,
      base:base,
      cheese:cheese,
      sauce:sauce,
      veggies:veggies,
      image:image
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
    res.status(500).json({
      success:false,
      message:"Error while adding Pizza!"
    })
  }
}

//GetAll tag handler function
exports.fetchAllPizza = async (req, res) => {
  try{
    const allPizza=await Pizza.find({}, {name:true, base:true, cheese:true, sauce:true, veggie:true, image:true});
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