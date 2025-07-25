const express = require("express");
const {
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
} = require("../../Controller/banner.controller");
const { upload } = require("../../middleware/multer.middleware");
const _ = express.Router();

_.route("/banner")
  .post(upload.fields([{ name: "image", maxCount: 10 }]), createBanner)
  .get(getAllBanner);

_.route("/banner/:id")
  .put(upload.fields([{ name: "image", maxCount: 10 }]), updateBanner)
  .delete(deleteBanner);

module.exports = _;
