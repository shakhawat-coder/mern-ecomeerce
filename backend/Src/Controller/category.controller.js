const categoryModel = require("../Model/category.model.js");
const { apiResponse } = require("../Utils/ApiResponse.js");
const { apiError } = require("../Utils/ApiError.js");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(409)
        .json(new apiError(false, null, "Category already exists", true));
    }
    const newCategory = await categoryModel.create({
      name,
      description,
    });
    if (newCategory) {
      return res
        .status(201)
        .json(
          new apiResponse(
            true,
            newCategory,
            "Category created successfully",
            false
          )
        );
    } else {
      return res
        .status(501)
        .json(new apiError(false, null, "Failed to create category", true));
    }
  } catch (error) {
    console.error("❌ Error creating category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =================get all categories==================
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categoryModel
      .find({})
      .populate("subcategories");
    // console.log(allCategories);

    if (allCategories.length === 0) {
      return res
        .status(404)
        .json(new apiError(false, null, "No categories found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            allCategories,
            "All categories fetched successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =================get single categories==================
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const singleCategory = await categoryModel.findById(id);
    if (!singleCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Category not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            singleCategory,
            "Single category fetched successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching single category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// =================update category==================
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Category not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            updatedCategory,
            "Category updated successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
};
