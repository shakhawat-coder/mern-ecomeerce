const express = require("express");
const _ = express.Router();
const {
  Registration,
  verifyOtp,
  Login,
  Logout,
  ResetPassword,
  recoveryEmail,
} = require("../../Controller/auth.controller.js");
const { authGuard } = require("../../middleware/authGuard.middleware.js");

_.route("/auth/registration").post(Registration);
_.route("/auth/verify_otp").post(verifyOtp);
_.route("/auth/login").post(Login);
// _.route("/auth/logout").post(Logout);
_.route("/auth/logout").get(authGuard, Logout);
_.route("/auth/reset-password").post(ResetPassword);
_.route("/auth/recovery-email").post(authGuard, recoveryEmail);

module.exports = _;
