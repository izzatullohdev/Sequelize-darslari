const { User } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_TOKEN_DATE }
  );
};

// Register User
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Foydalanuvchi bu email orqali ro'yxatdan o'tgan");
    error.statusCode = 400;
    return next(error);
  }
  const newUser = await User.create({ username, email, password });
  const token = generateToken(newUser);
  res
    .status(201)
    .json({ success: true, message: "Foydalanuvchi yaratildi", token });
});

// Login User
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("Foydalanuvchi topilmadi");
    error.statusCode = 404;
    return next(error);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Foydalanuvchi topilmadi");
    error.statusCode = 400;
    return next(error);
  }
  const token = generateToken(user);
  res
    .status(200)
    .json({ success: true, message: "Foydalanuvchi kiritildi", token });
});
