const { apiResponse } = require("../Utils/ApiResponse.js");
const { apiError } = require("../Utils/ApiError.js");
const userModel = require("../Model/user.model.js");
const { mailChecker, passwordChecker } = require("../Helpers/validator.js");
const { makeHashPassword } = require("../Helpers/bcrypt.js");
const { numberGenerator } = require("../Helpers/numberGenerator.js");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../Helpers/nodemailer.js");
const { generateToken } = require("../Helpers/JwtToken.js");
const { compare } = require("bcrypt");
const Registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    // =============exixting user check==================
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json(new apiError(false, null, "User already exists", true));
    }
    if (!mailChecker(email)) {
      return res
        .status(401)
        .json(new apiError(false, null, "Email is not valid", true));
    }
    if (!passwordChecker(password)) {
      return res
        .status(401)
        .json(new apiError(false, null, "Password is not valid", true));
    }

    const hashedPassword = await makeHashPassword(password);
    const otp = await numberGenerator();
    console.log(otp);
    // return;

    const isSentMail = await sendMail(email, otp);
    if (!isSentMail?.response) {
      return res
        .status(501)
        .json(new apiError(false, null, "Mail not sent", true));
    }
    const saveUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      otp: otp,
    }).save();

    setTimeout(() => {
      saveUser.otp = null;
      saveUser.save();
    }, 1000 * 60 * 10);

    return res
      .status(200)
      .json(new apiResponse(true, saveUser, "Registration success", false));
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============verify otp==================
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const user = await userModel.findOne({ email }).select(-email);
    if (!user) {
      return res
        .status(401)
        .json(new apiError(false, null, "User not found", true));
    }
    // if (user.isVerified) {
    //   return res
    //     .status(401)
    //     .json(new apiError(false, null, "User already verified", true));
    // }
    // if (user.otp !== otp) {
    //   return res
    //     .status(401)
    //     .json(new apiError(false, null, "Otp is not valid", true));
    // }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return res
      .status(200)
      .json(new apiResponse(true, user, "Otp verified successfully", false));
  } catch (error) {
    console.error("❌ otp Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===================login==================
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }

    const loggedUser = await userModel.findOne({ email });

    const isPasswordMatched = await compare(password, loggedUser?.password);
    console.log(loggedUser);

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json(
          new apiError(false, null, "Email or Password is not valid", true)
        );
    }
    const tokenPayload = {
      id: loggedUser._id,
      email: loggedUser.email,
    };
    const jwtToken = await generateToken(tokenPayload);
    if (jwtToken) {
      return res
        .status(200)
        .cookie("token", jwtToken, { httpOnly: true, secure: true })
        .json(
          new apiResponse(
            true,
            {
              id: loggedUser._id,
              email: loggedUser.email,
              token: `Bearer ${jwtToken}`,
            },
            "Login success"
          )
        );
    }
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===================logout==================
const Logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token")
      .json(new apiResponse(true, null, "Logout success", false));
  } catch (error) {
    console.error("❌ Logout Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =====================reset password==================
const ResetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    for (let key in req.body) {
      console.log(req.body[key]);
      if (!req.body[key]) {
        return res
          .status(400)
          .json(new apiError(false, null, `${key} is required`, true));
      }
      if (key === "email" && !mailChecker(req.body[key])) {
        return res
          .status(401)
          .json(new apiError(false, null, "Email is not valid", true));
      }
      if (key === "newPassword" && !passwordChecker(req.body[key])) {
        return res
          .status(401)
          .json(new apiError(false, null, "Password is not valid", true));
      }
      if (key === "oldPassword" && !passwordChecker(req.body[key])) {
        return res
          .status(401)
          .json(new apiError(false, null, "Password is not valid", true));
      }
    }
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return res
        .status(401)
        .json(new apiError(false, null, "User not found", true));
    } else {
      const isPasswordMatched = await compare(oldPassword, checkUser?.password);
      if (!isPasswordMatched) {
        return res
          .status(401)
          .json(
            new apiError(
              false,
              null,
              "Old password or email is not valid",
              true
            )
          );
      }
      const hashedPassword = await makeHashPassword(newPassword);
      checkUser.password = hashedPassword;
      await checkUser.save();
      return res
        .status(200)
        .json(new apiResponse(true, null, "Password reset success", false));
    }
  } catch (error) {
    console.error("❌ Reset Password Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===================recovey email==================
const recoveryEmail = async (req, res) => {
  try {
    const { id } = req.user;
    const { recoverEmail } = req.body;
    console.log(recoverEmail);

    if (!recoverEmail || !mailChecker(recoverEmail)) {
      return res
        .status(400)
        .json(
          new apiError(false, null, "Recovery email missing or invalid", true)
        );
    }

    const recovery = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { recoverEmail: recoverEmail } },
      { new: true }
    );
    console.log(recovery);

    if (recoveryEmail) {
      return res
        .status(200)
        .json(new apiResponse(true, null, "Recovery email sent", false));
    }
    return res
      .status(401)
      .json(new apiError(false, null, "User not found", true));
  } catch (error) {
    console.error("❌ recoverryEmail Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
module.exports = {
  Registration,
  verifyOtp,
  Login,
  Logout,
  ResetPassword,
  recoveryEmail,
};
