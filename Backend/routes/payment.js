const express = require("express");
const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controllers/Payment");
const { autht, isCustomer } = require("../middleware/auth");
const router = express.Router();
require("dotenv").config();
const stripe = require('stripe')("sk_test_51Np44FSCj8Oxsij7T8dy99A5etCTx39MER1397u1OcqFmyzhch9Z4NMN7s7CSrkJzt6LafYxqLbTnh9TuMfpnutV00iuL6yHs9")


router.post('/capturePayment', autht, isCustomer, capturePayment);
router.post('/verifySignature', autht, isCustomer, verifySignature);
router.post('/sendPaymentSuccessEmail', autht, isCustomer, sendPaymentSuccessEmail)
router.post('/createPayment', autht, isCustomer, async(req, res) => {
  const product = req.body;
  // const lineItems = product.map((prod) => (
  //   {
  //     price_data:{
  //       currency:prod.currency,
  //       name:prod.name,
  //       unit_amount: prod.price*100
  //     },
  //     quantity: prod.qua
  //   }
  // ))
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product.price,
        quantity: product.quantity,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/home`,
    cancel_url: `http://localhost:3000/myOrders`,
  });
  console.log(session)
  res.redirect(303, session.url);
})

module.exports = router;