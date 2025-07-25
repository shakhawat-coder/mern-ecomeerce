const express = require("express");
const registration = require("./api/auth.apiRoutes");
const category = require("./api/category.apiRoutes");
const subCat = require("./api/subCategory.apiRooutes");
const product = require("./api/product.apiRoutes");
const banner = require("./api/banner.apiRoutes");
const flashSale = require("./api/flashSale.apiRoutes");
const bestselling = require("./api/bestSell.apiRoutes");
const newArrival = require("./api/newArrival.apiRoutes");
const _ = express.Router();
const baseApi = process.env.BASE_API || "/api/v1";

_.use(baseApi, registration);
_.use(baseApi, category);
_.use(baseApi, subCat);
_.use(baseApi, product);
_.use(baseApi, banner);
_.use(baseApi, flashSale);
_.use(baseApi, bestselling);
_.use(baseApi, newArrival);
// _.use("*", (req, res) => {
//  return res.status(404).json({
//     success: false,
//     data: null,
//     error: true,
//     message: "Route not found",
//   });
// });

module.exports = _;
