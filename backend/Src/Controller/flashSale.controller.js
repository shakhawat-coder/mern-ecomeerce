const { apiResponse } = require("../Utils/ApiResponse.js");
const { apiError } = require("../Utils/ApiError.js");
const flashSaleModel = require("../Model/flashSale.model.js");

// ===============create flashsale=============
const createFlashsale = async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) {
      return res
        .status(401)
        .json(new apiError(false, null, "Pruduct missingi", true));
    }
    const isAlreadyExist = await flashSaleModel.findOne({ product: product });
    if (isAlreadyExist) {
      return res
        .status(401)
        .json(new apiError(false, null, "Product already exist", true));
    }
    const saveFlashSaleProduct = await flashSaleModel.create({
      product: product,
    });
    if (!saveFlashSaleProduct) {
      return res
        .status(500)
        .json(
          new apiError(false, null, "flashsale Product creation failed", true)
        );
    }
    return res
      .status(200)
      .json(
        new apiResponse(
          true,
          saveFlashSaleProduct,
          "Product create successfull"
        )
      );
  } catch (error) {
    console.error("❌ Error creating flashsale:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ================get flashsale products=============
const getFlashSaleProudct = async (req, res) => {
  try {
    const allFlashSaleProduct = await flashSaleModel.find({}).populate({
      path: "product",
    });
    if (!allFlashSaleProduct) {
      return res
        .status(401)
        .json(new apiError(false, null, "flashsale product not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            allFlashSaleProduct,
            "All flashSale Product Fetched",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error getting flashsale product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============update flashsale product==========
const updateFlashSaleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .json(new apiError(false, null, "Product ID is required", true));
    }
    const updateFlashSale = await flashSaleModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updateFlashSale) {
      return res
        .status(401)
        .json(new apiError(false, null, "flashsale product not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            updateFlashSale,
            "flashsale product updated successfully"
          )
        );
    }
  } catch (error) {
    console.error("❌ Error updating flashsale product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ==============delete flashsale product==========
const deleteFlashSaleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(401)
        .json(new apiError(false, null, "Product ID is required", true));
    }
    const deleteFlashSale = await flashSaleModel.findByIdAndDelete({ _id: id });
    if (!deleteFlashSale) {
      return res
        .status(401)
        .json(new apiError(false, null, "flashsale product not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            deleteFlashSale,
            "flashsale product deleted successfully"
          )
        );
    }
  } catch (error) {
    console.error("❌ Error deleting flashsale product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
module.exports = {
  createFlashsale,
  getFlashSaleProudct,
  updateFlashSaleProduct,
  deleteFlashSaleProduct,
};
