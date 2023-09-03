const Base = require("../models/Base");

exports.createBase = async (req, res) => {
  try{
    const { name, quantity } = req.body;
    if(!name || !quantity){
      return res.status(400).json({
        success:false,
        message:"Please provide name of the Base"
      });
    }
    const BaseDetail = await Base.create({
      name:name,
      quantity:quantity
    })
    return res.status(201).json({
      success:true,
      message:"Base added successfully",
      data:BaseDetail
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Base inside Base controller!"
    })
  }
}

exports.addBase = async (req, res) => {
  try{
    const { name, frequency } = req.body;
    if(!name || !frequency){
      return res.status(400).json({
        success:false,
        message:"Please provide all the details"
      });
    }
    const BaseDetails = await Base.findOneAndUpdate(
      { name: name },
      { $inc: { quantity: frequency } }
    );
    return res.status(201).json({
      success:true,
      message:"Base added successfully",
    });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Error while adding Base inside Base controller!"
    })
  }
}

exports.fetchAllBase = async (req, res) => {
  try{
    const details=await Base.find({}, {name:true, quantity:true});
    return res.status(200).json({
      success:true,
      message:"All Base fetched successfully",
      data:details
    });
  } catch(err){
    res.status(500).json({
      success:false,
      message:"Error while fetching all Base inside Base controller!"
    })
  }
}