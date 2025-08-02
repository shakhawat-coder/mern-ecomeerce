const productModel = require("../Model/product.model.js");
const { apiResponse } = require("../Utils/ApiResponse.js");
const { apiError } = require("../Utils/ApiError.js");
// const { staticFileGenerator } = require("../Helpers/staticFileGenerator.js");
const NodeCache = require("node-cache");
const {
  uploadCloudinaryFile,
  deleteCloudinaryFile,
} = require("../Utils/cloudinary.js");
const myCache = new NodeCache();

// ============crate product==========
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory } = req.body;
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json(new apiError(false, null, "Missing required fields", true));
    }
    if (!req?.files) {
      return res
        .status(400)
        .json(new apiError(false, null, "File missing", true));
    }
    const allImage = req.files?.image;
    let allUploadImage = [];
    for (let image of allImage) {
      let uploadFile = await uploadCloudinaryFile(image?.path);
      allUploadImage.push(uploadFile.secure_url);
    }

    // const allImageWithPath = staticFileGenerator(allImage);

    const alreadyExinstProduct = await productModel.find({
      name: name,
    });
    if (alreadyExinstProduct?.length) {
      return res
        .status(400)
        .json(new apiError(false, null, "Product already exists", true));
    }
    const newProduct = await new productModel({
      name,
      description,
      price,
      category,
      subCategory,
      image: allUploadImage,
      ...req.body,
    }).save();
    if (newProduct) {
      return res
        .status(201)
        .json(new apiResponse(true, newProduct, "Product created", false));
    } else {
      return res
        .status(500)
        .json(new apiError(false, null, "Internal server error", true));
    }
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ================get all products=========
const getAllProducts = async (req, res) => {
  try {
    const value = myCache.get("allProducts");

    if (value === undefined) {
      const allProducts = await productModel
        .find({})
        .limit(10)
        .populate("category");
      myCache.set("allProducts", JSON.stringify(allProducts), 60 * 60);
      return res
        .status(200)
        .json(new apiResponse(true, allProducts, "Products fetched", false));
    }

    // ✅ Respond with cached value
    const cachedProducts = JSON.parse(value);
    return res
      .status(200)
      .json(
        new apiResponse(true, cachedProducts, "Products from cache", false)
      );
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============update product==============
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const isExistProduct = await productModel.findById(productId);
    if (!isExistProduct) {
      return res
        .status(404)
        .json(new apiError(false, null, "Product not found", true));
    }
    let delete_resourcesCloudinary = null;
    let allUploadImage = [];
    if (req.files?.image) {
      for (let image of isExistProduct.image) {
        const splitImageAddress = image.split("/");
        const cloudinaryFilePath =
          splitImageAddress[splitImageAddress.length - 1]?.split(".")[0];
        delete_resourcesCloudinary = await deleteCloudinaryFile(
          cloudinaryFilePath
        );
        await deleteCloudinaryFile(cloudinaryFilePath);
        console.log(delete_resourcesCloudinary);
      }
      if (delete_resourcesCloudinary) {
        for (let image of req.files?.image) {
          let uploadFile = await uploadCloudinaryFile(image?.path);
          allUploadImage.push(uploadFile.secure_url);
        }
        const updateProduct = await productModel.findOneAndUpdate(
          { _id: productId },
          { ...req.body, image: allUploadImage },
          { new: true }
        );
        if (updateProduct) {
          return res
            .status(200)
            .json(
              new apiResponse(true, updateProduct, "Product updated", false)
            );
        }
      }
      const updateProduct = await productModel.findOneAndUpdate(
        { _id: productId },
        { ...req.body, image: allUploadImage },
        { new: true }
      );
      if (updateProduct) {
        return res
          .status(200)
          .json(new apiResponse(true, updateProduct, "Product updated", false));
      }
    }
  } catch (error) {
    console.error("❌ Error updating products:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============get single product================
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const getSingleProduct = await productModel
      .findById(productId)
      .populate("category")
      .populate("subCategory");
    if (!getSingleProduct) {
      return res
        .status(404)
        .json(new apiError(false, null, "Product not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(true, getSingleProduct, "Product fetched", false)
        );
    }
  } catch (error) {
    console.error("❌ Error fetching single product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============delete product============
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await productModel.findOneAndDelete({
      _id: productId,
    });
    if (!deletedProduct) {
      return res
        .status(404)
        .json(new apiError(false, null, "Product not found", true));
    } else {
      return res
        .status(200)
        .json(new apiResponse(true, deletedProduct, "Product deleted", false));
    }
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
};

// ============class 88 part2 2min done=====
