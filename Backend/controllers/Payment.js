const {instance} = require('../config/razorpay');
const Order = require('../models/Order');
const Pizza = require('../models/Pizza');
const User = require('../models/User');
const crypto = require('crypto');
const mailSender = require('./mailSender');

exports.capturePayment = async (req, res) => {
  try{
    const { pizzaId } = req.body;
    const userId = req.user.id;
    if(!pizzaId || !userId){
      return res.status(422).json({
        message: 'Please give all details for order payment'
      });
    }
    const pizza = await Pizza.findById(pizzaId);
    if(!pizza){
      return res.status(422).json({
        message: 'Invalid Pizza id'
      });
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(422).json({
        message: 'Invalid User id'
      });
    }
    const amount = pizza.price;
    const currency = "INR";
    const options = {
      amount: amount*100,
      currency: currency,
      receipt: Math.random(Date.now()).toString(),
    }
    const paymentResponse = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      paymentResponse
    })
  } catch(err){
    console.error('Error in capturing Payment', err);
    return res.status(500).json({
      success:false,
      err
    });
  }
}

exports.verifySignature = async (req, res) => {
  try{
    console.log("Came into backend verify signature")
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const userId = req.user.id;
    const {pizzaId} = req.body;
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !pizzaId){
      return res.status(500).json({success:false, message:"Payment Failed while verifying signature! all details are not available"});
    }
    let body = razorpay_order_id + '|' + razorpay_payment_id;

    //Hashing webhook secret
    const shasum = crypto.createHMAC("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
    console.log(shasum)
    console.log(razorpay_signature)
    //Comparing webhooksecret and signature
    if(razorpay_signature === shasum){
      console.log("Payment is Authorized!");
      //const { pizzaId, userId } = req.body.payload.entity.notes;
      try{
        const orderDetails = await Order.create({
          user:userId,
          pizza:pizzaId
        })
        const order = await Order.findOne({user:userId, pizza:pizzaId}).populate("user").populate("pizza")
        await mailSender("theaditya1985@gmail.com", "New Order", order);
        await mailSender(req.user.email, "Payment Successful", order);
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
      return res.status(200).json({
        success: true,
      })
    }
  } catch(err){
    console.error('Error in verifying Payment', err);
    return res.status(500).json({
      success:false,
      err
    });
  }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
	const { orderId, paymentId, amount } = req.body;
	const userId = req.user.id;
	if (!orderId || !paymentId || !amount || !userId) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all the fields" });
	}
	try {
		const enrolledStudent = await User.findById(userId);
		await mailSender(enrolledStudent.email, `Payment Received`, "Success Payment");
	} catch (error) {
		console.log("error in sending mail", error);
		return res
			.status(500)
			.json({ success: false, message: "Could not send email" });
	}
};