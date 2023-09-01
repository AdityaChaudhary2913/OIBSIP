const express = require("express");
const router = express.Router();

const { login, signUp, googleSignUp } = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

router.post("/signup", signUp);
router.post("/login", login);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
