const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  storeName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  storeAddress: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  status: {
    type: String,
    enum: ["pending", "active", "deactive"],
  },
});

module.exports = mongoose.model("store", storeSchema);
