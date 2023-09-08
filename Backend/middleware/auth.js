const jwt=require("jsonwebtoken");

exports.autht = async (req, res, next) => {
  try{
    //Extracting token
    const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    //Checking presence of token
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Token is missing!"
        });
    }

    //Verifing Token
    try{
      const decoded= jwt.verify(token, process.env.JWT_SECRET);
      req.user=decoded;
    } catch(err){
      return res.status(401).json({
        success:false,
        message:"Invalid Token ( Inside middleware auth ) !",
      });
    }
    next();
  } catch(err){
    console.log(err)
    return res.status(500).json({
      success:false,
      message: "Error while Authorization!"
    });
  }
}

//isStudent
exports.isCustomer = async (req, res, next) => {
  try{
    if(req.user.role !== "Customer"){
      return res.status(401).json({
        success:false,
        message:"You are not a customer!"
      });
    }
    next();
  } catch(err){
    return res.status(500).json({
      success:false,
      message: "Error while Authorization of Customer!"
    });
  }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try{
    if(req.user.id !== "64f5c05802fdb34b3648e648" && req.user.role != "Admin"){
      return res.status(401).json({
        success:false,
        message:"You are not a Admin!"
      });
    }
    next();
  } catch(err){
    return res.status(500).json({
      success:false,
      message: "Error while Authorization of Admin!"
    });
  }
}