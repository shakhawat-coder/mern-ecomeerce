const mongoose = require("mongoose");
const { Schema } = mongoose;

const newArrivalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    position: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("newArrival", newArrivalSchema);
