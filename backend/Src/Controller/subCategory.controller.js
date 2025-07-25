const { apiResponse } = require("../Utils/ApiResponse.js");
const { apiError } = require("../Utils/ApiError.js");
const subCategoryModel = require("../Model/subCategory.model.js");
const categoryModel = require("../Model/category.model.js");
// ==============create subcategories==========
const createSubCategory = async (req, res) => {
  try {
    const { name, description, category, product } = req.body;
    if (!name || !description || !category) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const existingSubCategory = await subCategoryModel.findOne({
      name: req.body.name,
    });
    if (existingSubCategory) {
      return res
        .status(409)
        .json(new apiError(false, null, "Subcategory already exists", true));
    }

    // update subcategory at database
    const setSubCategory = await subCategoryModel.create({
      ...req.body,
    });
    if (setSubCategory) {
      const findCategory = await categoryModel.findOne({
        _id: req.body.category,
      });
      if (!findCategory) {
        return res
          .status(404)
          .json(new apiError(false, null, "Category not found", true));
      }
      findCategory.subcategories.push(setSubCategory._id);
      // console.log(findCategory);
      await findCategory.save();
      const populatedCategory = await categoryModel
        .findById(findCategory._id)
        .populate({
          path: "subcategory",
          select: "name",
          strictPopulate: false,
        });

      return res
        .status(201)
        .json(
          new apiResponse(
            true,
            populatedCategory,
            "Subcategory created successfully",
            false
          )
        );
    }
    return res
      .status(400)
      .json(
        new apiError(false, null, `${error} subcategory creating error`, true)
      );
  } catch (error) {
    console.error("❌ Error creating subcategory:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =================get all subcategories ==============
const getAllSubCategories = async (req, res) => {
  try {
    const allSubcategories = await subCategoryModel
      .find({})
      .populate("category");
    if (allSubcategories.length === 0) {
      return res
        .status(404)
        .json(new apiError(false, null, "No subcategories found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            allSubcategories,
            "Subcategories fetched successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching subcategories:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ============get single subcategories==========
const getSingleSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const singleSubCategory = await subCategoryModel
      .findById(id)
      .populate("category");
    if (!singleSubCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Subcategory not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            singleSubCategory,
            "Single subcategory fetched successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching subcategory:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =============delete subCategory=============
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubCategory = await subCategoryModel.findOneAndDelete({
      _id: id,
    });
    if (!deletedSubCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Subcategory not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            deletedSubCategory,
            "Subcategory deleted successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error deleting subcategory:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============update subCategory =============
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSubCategory = await subCategoryModel
      .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
      .populate("category");
    if (!updateSubCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Subcategory not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            updateSubCategory,
            "Subcategory updated successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error updating subcategory:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  deleteSubCategory,
  updateSubCategory,
};
