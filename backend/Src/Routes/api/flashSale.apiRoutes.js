const express = require("express");
const {
  createFlashsale,
  getFlashSaleProudct,
  updateFlashSaleProduct,
  deleteFlashSaleProduct,
} = require("../../Controller/flashSale.controller");
const _ = express.Router();

_.route("/flashsale").post(createFlashsale).get(getFlashSaleProudct);
_.route("/flashsale/:id")
  .put(updateFlashSaleProduct)
  .delete(deleteFlashSaleProduct);
module.exports = _;
