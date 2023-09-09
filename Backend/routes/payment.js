const express = require("express");
const { capturePayment, verifySignature } = require("../controllers/Payment");
const { autht, isCustomer } = require("../middleware/auth");
const router = express.Router();


router.post('/capturePayment', autht, isCustomer, capturePayment);
router.post('/verifySignature', autht, isCustomer, verifySignature);

module.exports = router;