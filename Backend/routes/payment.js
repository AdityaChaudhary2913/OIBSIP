const express = require("express");
const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require("../controllers/Payment");
const { autht, isCustomer } = require("../middleware/auth");
const router = express.Router();


router.post('/capturePayment', autht, isCustomer, capturePayment);
router.post('/verifySignature', autht, isCustomer, verifySignature);
router.post('/sendPaymentSuccessEmail', autht, isCustomer, sendPaymentSuccessEmail)

module.exports = router;