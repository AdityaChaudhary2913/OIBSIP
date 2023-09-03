const Veggies = require("../models/Veggies");

exports.createVeggies = async (req, res) => {
  try{
    const { name, quantity } = req.body;
    if(!name || !quantity){
      return res.status(400).json({
        success:false,
        message:"Please provide name of the Veggie"
      });
    }
    const veggieDetail = await Veggies.create({
      name:name,
      quantity:quantity
    })
    return res.status(201).json({
      success:true,
      message:"Veggie added successfully",
      data:veggieDetail
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding veggie inside Veggie controller!"
    })
  }
}

exports.addVeggies = async (req, res) => {
  try{
    const { name, frequency } = req.body;
    if(!name || !frequency){
      return res.status(400).json({
        success:false,
        message:"Please provide all the details"
      });
    }
    const VeggiesDetails = await Veggies.findOneAndUpdate(
      { name: name },
      { $inc: { quantity: frequency } }
    );
    return res.status(201).json({
      success:true,
      message:"Veggies added successfully",
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Veggies inside Veggies controller!"
    })
  }
}

exports.fetchAllVeggies = async (req, res) => {
  try{
    const details=await Veggies.find({}, {name:true, quantity:true});
    return res.status(200).json({
      success:true,
      message:"All Veggies fetched successfully",
      data:details
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching all veggies inside Veggie controller!"
    })
  }
}