const express = require("express");
const {
  createBestSellingProduct,
  getAllBestSellingProuct,
} = require("../../Controller/bestSell.controller");
const _ = express.Router();

_.route("/bestselling")
  .post(createBestSellingProduct)
  .get(getAllBestSellingProuct);

module.exports = _;
