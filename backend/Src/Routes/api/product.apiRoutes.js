const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
} = require("../../Controller/product.controller");
const { upload } = require("../../middleware/multer.middleware");
const _ = express.Router();

_.route("/product")
  .post(upload.fields([{ name: "image", maxCount: 10 }]), createProduct)
  .get(getAllProducts);
_.route("/product/:productId")
  .put(upload.fields([{ name: "image", maxCount: 10 }]), updateProduct)
  .get(getSingleProduct)
  .delete(deleteProduct);

module.exports = _;
