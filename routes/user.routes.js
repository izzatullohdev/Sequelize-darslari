const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { userValidationRules, validate } = require("../middlewares/validation");
router.get("/", getAllUsers); //check
router.get("/:id", getUserById); //check
router.post("/", userValidationRules(), validate, createUser); //check
router.put("/:id", userValidationRules(), validate, updateUser); //check
router.delete("/:id", deleteUser);

module.exports = router;
