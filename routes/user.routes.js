const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
} = require("../controllers/user.controller");
const authMiddlewarare = require("../middlewares/auth.middleware");
const { userValidationRules, validate } = require("../middlewares/validation");
router.get("/", getAllUsers); //check
router.get("/:id", authMiddlewarare, getUserById); //check
router.post("/", userValidationRules(), validate, createUser); //check
router.put("/:id", userValidationRules(), validate, updateUser); //check
router.delete("/:id", deleteUser); //check
router.post("/restore/:id", restoreUser);

module.exports = router;
