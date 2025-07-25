const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name missing"],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email missing"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number missing"],
      trim: true,
      max: [11, "Max length is 11 digits"],
      min: [11, "Min length is 11 digits"],
    },
    address1: {
      type: String,
      required: [true, "Address1 missing"],
      trim: true,
    },
    address2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postcode: {
      type: Number,
      trim: true,
    },
    division: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password missing"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "marchant"],
      default: "user",
    },
    avatar: {
      type: String,
      //   default: "default.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    resetOtp: {
      type: Number,
    },
    recoverEmail: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
