const Sauce = require("../models/Sauce");

exports.createSauce = async (req, res) => {
  try{
    const { name, quantity } = req.body;
    if(!name || !quantity){
      return res.status(400).json({
        success:false,
        message:"Please provide name of the Sauce"
      });
    }
    const sauceDetail = await Sauce.create({
      name:name,
      quantity:quantity
    })
    return res.status(201).json({
      success:true,
      message:"Sauce added successfully",
      data:sauceDetail
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Sauce inside Sauce controller!"
    })
  }
}

exports.addSauce = async (req, res) => {
  try{
    const { name, frequency } = req.body;
    if(!name || !frequency){
      return res.status(400).json({
        success:false,
        message:"Please provide all the details"
      });
    }
    const sauceDetails = await Sauce.findOneAndUpdate(
      { name: name },
      { $inc: { quantity: frequency } }
    );
    return res.status(201).json({
      success:true,
      message:"Sauce added successfully",
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Sauce inside Sauce controller!"
    })
  }
}

exports.fetchAllSauce = async (req, res) => {
  try{
    const details=await Sauce.find({}, {name:true, quantity:true});
    return res.status(200).json({
      success:true,
      message:"All Sauce fetched successfully",
      data:details
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching all Sauce inside Sauce controller!"
    })
  }
}