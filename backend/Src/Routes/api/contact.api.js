const express = require("express");
const _ = express.Router();
const { createContact, getAllContacts } = require("../../Controller/contact.controller");

_.route("/contact").post(createContact).get(getAllContacts);

module.exports = _;