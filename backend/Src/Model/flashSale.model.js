const mongoose = require("mongoose");
const { Schema } = mongoose;

const flashSaleScema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = mongoose.model("flashSale", flashSaleScema);
