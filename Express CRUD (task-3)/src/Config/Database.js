const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/express")
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("database not connected");
  });


