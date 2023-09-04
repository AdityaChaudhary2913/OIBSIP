const Cheese = require("../models/Cheese");

exports.createCheese = async (req, res) => {
  try{
    const { name1, quantity, price } = req.body;

    if(!name1 || !quantity || !price){
      return res.status(400).json({
        success:false,
        message:"Please provide name of the Cheese"
      });
    }
    const CheeseDetail = await Cheese.create({
      name:name1,
      quantity:quantity,
      price : price
    })
    return res.status(201).json({
      success:true,
      message:"Cheese added successfully",
      data:CheeseDetail
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Cheese inside Cheese controller!"
    })
  }
}

exports.addCheese = async (req, res) => {
  try{
    const { name2, frequency } = req.body;
    if(!name2 || !frequency){
      return res.status(400).json({
        success:false,
        message:"Please provide all the details"
      });
    }
    const CheeseDetails = await Cheese.findOneAndUpdate(
      { name: name2 },
      { $inc: { quantity: frequency } }
    );
    return res.status(201).json({
      success:true,
      message:"Cheese added successfully",
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Cheese inside Cheese controller!"
    })
  }
}

exports.fetchAllCheese = async (req, res) => {
  try{
    const details=await Cheese.find({}, {name:true, quantity:true, price:true});
    return res.status(200).json({
      success:true,
      message:"All Cheese fetched successfully",
      data:details
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching all Cheese inside Cheese controller!"
    })
  }
}