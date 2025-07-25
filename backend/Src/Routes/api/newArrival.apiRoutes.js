const express = require("express");
const {
  createNewArrival,
  updateNewArrival,
  getAllNewArrival,
  getSingleNewArrival,
  deleteNewArrival,
} = require("../../Controller/newArrival.controller");
const { upload } = require("../../middleware/multer.middleware");
const _ = express.Router();

_.route("/new-arrival")
  .post(upload.fields([{ name: "image", maxCount: 10 }]), createNewArrival)
  .get(getAllNewArrival);
_.route("/new-arrival/:id")
  .put(upload.fields([{ name: "image", maxCount: 10 }]), updateNewArrival)
  .get(getSingleNewArrival)
  .delete(deleteNewArrival);

module.exports = _;
