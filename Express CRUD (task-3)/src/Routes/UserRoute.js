const express = require("express");
const router = express.Router();
const {
  AddUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} = require("../Controller/UserController");

// CREATE
router.post("/create", AddUser);
// READ
router.get("/read", GetUser);
// UPDATE
router.put("/update", UpdateUser);
//DELETE
router.delete("/delete", DeleteUser);

module.exports = router;
