const { apiResponse } = require("../Utils/ApiResponse.js");
const { apiError } = require("../Utils/ApiError.js");
const bestSellingModel = require("../Model/bestSelling.model.js");

// ==============create best selling product=============

const createBestSellingProduct = async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) {
      return res
        .status(401)
        .json(new apiError(false, null, "Product missing", true));
    }
    const isAlreadyExist = await bestSellingModel.findOne({ product: product });
    if (isAlreadyExist) {
      return res
        .status(401)
        .json(new apiError(false, null, "Product already exists", true));
    }
    const saveBestSellingProduct = await bestSellingModel.create({
      product: product,
    });
    if (!saveBestSellingProduct) {
      return res
        .status(500)
        .json(
          new apiError(
            false,
            null,
            "Best selling product creation failed",
            true
          )
        );
    }
    return res
      .status(200)
      .json(
        new apiResponse(
          true,
          saveBestSellingProduct,
          " Best selling Product create successfull"
        )
      );
  } catch (error) {
    console.error("❌ Error creating best selling product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ==============get all best selling product=============
const getAllBestSellingProuct = async (req, res) => {
  try {
    const AllbestSellingProduct = await bestSellingModel.find({}).populate({
      path: "product",
    });
    if (!AllbestSellingProduct) {
      return res
        .status(401)
        .json(
          new apiError(false, null, "best selling product not found", true)
        );
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            AllbestSellingProduct,
            "All best selling Product Fetched",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching best selling products:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

module.exports = {
  createBestSellingProduct,
  getAllBestSellingProuct,
};
