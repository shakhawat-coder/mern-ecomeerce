const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} = require("../../Controller/category.controller");
const _ = express.Router();
_.route("/category").post(createCategory).get(getAllCategories);
_.route("/category/:id").get(getSingleCategory).patch(updateCategory);
module.exports = _;
