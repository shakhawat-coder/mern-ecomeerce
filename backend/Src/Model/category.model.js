const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "subcategory",
    },
  ],
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
});
// Virtual populate for products referencing this category
categorySchema.virtual("products", {
  ref: "product", // model name
  localField: "_id", // category _id
  foreignField: "category", // field in product model
});

// Enable virtuals in JSON and Object output
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("category", categorySchema);
