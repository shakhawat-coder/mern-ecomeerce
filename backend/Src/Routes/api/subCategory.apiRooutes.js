const express = require("express");
const {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../../Controller/subCategory.controller");
const _ = express.Router();

_.route("/subcategory").post(createSubCategory).get(getAllSubCategories);
_.route("/subcategory/:id")
  .get(getSingleSubCategory)
  .delete(deleteSubCategory)
  .patch(updateSubCategory);

module.exports = _;
