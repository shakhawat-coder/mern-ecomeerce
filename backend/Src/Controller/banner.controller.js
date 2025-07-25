const bannerModel = require("../Model/banner.model.js");
const { apiError } = require("../Utils/ApiError");
const { apiResponse } = require("../Utils/ApiResponse.js");
const {
  uploadCloudinaryFile,
  deleteCloudinaryFile,
} = require("../Utils/cloudinary.js");

const createBanner = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const isAlreadyExistBanner = await bannerModel.findOne({ name: name });
    if (isAlreadyExistBanner?.length) {
      return res
        .status(400)
        .json(new apiError(false, null, "Banner already exists", true));
    }

    // =============upload image to cloudinary==========
    const allImage = req.files?.image;
    let allUploadImage = [];
    for (let image of allImage) {
      let uploadFile = await uploadCloudinaryFile(image?.path);
      allUploadImage.push(uploadFile.secure_url);
    }

    const saveBanner = await new bannerModel({
      name: name,
      image: allUploadImage,
    }).save();
    if (saveBanner) {
      return res
        .status(201)
        .json(
          new apiResponse(
            true,
            saveBanner,
            "Banner created successfully",
            false
          )
        );
    }
    return res
      .status(400)
      .json(new apiError(false, null, "banner not created", true));
  } catch (error) {
    console.error("❌ Error creating banner", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ==============get all banner image ================
const getAllBanner = async (req, res) => {
  try {
    const allBanner = await bannerModel.find({});
    if (allBanner?.length) {
      return res
        .status(200)
        .json(
          new apiResponse(true, allBanner, "Banner fetched successfully", false)
        );
    } else {
      return res
        .status(404)
        .json(new apiError(false, null, "No banner found", true));
    }
  } catch (error) {
    console.error("❌ Error fetching banner", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ==============update banner =============
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const isExistingBanner = await bannerModel.findById(id);
    if (!isExistingBanner) {
      return res
        .status(401)
        .json(new apiError(false, null, "Banner not found", true));
    }
    let delete_resourcesCloudinary = null;
    let allUploadBanner = [];
    if (req.files?.image) {
      for (let image of isExistingBanner.image) {
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
          let uploadBanner = await uploadCloudinaryFile(image?.path);
          allUploadBanner.push(uploadBanner.secure_url);
        }
        const updateBanner = await bannerModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, image: allUploadBanner }
        );
        if (updateBanner) {
          return res
            .status(200)
            .json(
              new apiResponse(
                true,
                updateBanner,
                "Banner updated successfully",
                false
              )
            );
        }
        return res
          .status(400)
          .json(new apiError(false, null, "Banner not updated", true));
      }
    }
  } catch (error) {
    console.error("❌ Error updating banner", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =======================delete banner====================
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const isExistingBanner = await bannerModel.findById(id);

    if (!isExistingBanner) {
      return res
        .status(401)
        .json(new apiError(false, null, "Banner not found", true));
    }

    // ✅ Step 1: Delete images from Cloudinary
    if (isExistingBanner.image && Array.isArray(isExistingBanner.image)) {
      for (const imageUrl of isExistingBanner.image) {
        const publicId = imageUrl.split("/").pop().split(".")[0]; // extract Cloudinary public ID
        const deleteResult = await deleteCloudinaryFile(publicId);
      }
    }

    // ✅ Step 2: Delete the banner document
    const deleteBanner = await bannerModel.findByIdAndDelete(id);
    if (deleteBanner) {
      return res
        .status(200)
        .json(new apiResponse(true, deleteBanner, "Banner deleted", false));
    }

    return res
      .status(400)
      .json(new apiError(false, null, "Failed to delete banner", true));
  } catch (error) {
    console.error("❌ Error deleting banner", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

module.exports = { createBanner, getAllBanner, updateBanner, deleteBanner };
