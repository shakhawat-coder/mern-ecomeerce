const dotenv = require("dotenv").config();
const { dbConnect } = require("./Database/DBconnect.js");
const { app } = require("./app.js");
const express = require("express");
dbConnect()
  .then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
