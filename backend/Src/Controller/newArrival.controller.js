const newArrivalModel = require("../Model/newArrival.model.js");
const { apiError } = require("../Utils/ApiError");
const { apiResponse } = require("../Utils/ApiResponse.js");
const {
  uploadCloudinaryFile,
  deleteCloudinaryFile,
} = require("../Utils/cloudinary.js");

const createNewArrival = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json(new apiError(false, null, "Title is required", true));
    }
    const isAlreadyExist = await newArrivalModel.findOne({ title: title });
    if (isAlreadyExist?.length) {
      return res
        .status(400)
        .json(new apiError(false, null, "New arrival already exists", true));
    }
    // =============upload image to cloudinary==========
    const newArrivalImages = req.files?.image;
    let allUploadImage = [];
    for (let image of newArrivalImages) {
      let uploadFile = await uploadCloudinaryFile(image?.path);
      allUploadImage.push(uploadFile.secure_url);
    }
    const saveNewArrival = await new newArrivalModel({
      title: title,
      image: allUploadImage,
      ...req.body,
    }).save();
    if (saveNewArrival) {
      return res
        .status(201)
        .json(
          new apiResponse(
            true,
            saveNewArrival,
            "New arrival created successfully",
            false
          )
        );
    }
    return res
      .status(400)
      .json(new apiError(false, null, "New arrival not created", true));
  } catch (error) {
    console.error("❌ Error creating new arrival", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ================get all new arrivals ================
const getAllNewArrival = async (req, res) => {
  try {
    const allNewArrivals = await newArrivalModel.find({});
    if (allNewArrivals?.length) {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            allNewArrivals,
            "All new arrivals fetched successfully",
            false
          )
        );
    }
    return res
      .status(404)
      .json(new apiError(false, null, "No new arrivals found", true));
  } catch (error) {
    console.error("❌ Error fetching new arrivals", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ================get single new arrival banner =================
const getSingleNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const singleNewArrival = await newArrivalModel.findById(id);
    if (!singleNewArrival) {
      return res
        .status(404)
        .json(new apiError(false, null, "New arrival not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            singleNewArrival,
            "Single new arrival fetched successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching single new arrival", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ================update banner =================
const updateNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const isExistingNewArrival = await newArrivalModel.findById(id);
    if (!isExistingNewArrival) {
      return res
        .status(404)
        .json(new apiError(false, null, "New arrival not found", true));
    }
    let delete_resourcesCloudinary = null;
    let allUploadNewArrival = [];
    if (req.files?.image) {
      for (let image of isExistingNewArrival.image) {
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
          allUploadNewArrival.push(uploadBanner.secure_url);
        }
        const updateNewArrival = await newArrivalModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, image: allUploadNewArrival }
        );
        if (updateNewArrival) {
          return res
            .status(200)
            .json(
              new apiResponse(
                true,
                updateNewArrival,
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
    const updateNewArrival = await newArrivalModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (updateNewArrival) {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            updateNewArrival,
            "New arrival updated successfully",
            false
          )
        );
    }
    return res
      .status(400)
      .json(new apiError(false, null, "New arrival not updated", true));
  } catch (error) {
    console.error("❌ Error updating new arrival", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ================delete new arrival ==============
const deleteNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const isExistingNewArrival = await newArrivalModel.findById(id);
    if (!isExistingNewArrival) {
      return res
        .status(404)
        .json(new apiError(false, null, "New arrival not found", true));
    }

    if (
      isExistingNewArrival.image &&
      Array.isArray(isExistingNewArrival.image)
    ) {
      for (const imageUrl of isExistingNewArrival.image) {
        const publicId = imageUrl.split("/").pop().split(".")[0]; // extract Cloudinary public ID
        const deleteResult = await deleteCloudinaryFile(publicId);
      }
    }
    const deleteNewArrival = await newArrivalModel.findByIdAndDelete(id);
    if (deleteNewArrival) {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            deleteNewArrival,
            "New arrival deleted successfully",
            false
          )
        );
    }
    return res
      .status(400)
      .json(new apiError(false, null, "New arrival not deleted", true));
  } catch (error) {
    console.error("❌ Error deleting new arrival:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

module.exports = {
  createNewArrival,
  getAllNewArrival,
  getSingleNewArrival,
  updateNewArrival,
  deleteNewArrival,
};
