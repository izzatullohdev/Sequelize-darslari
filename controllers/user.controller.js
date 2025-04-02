const { User, Post } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
// GET /users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({ include: { model: Post, as: "posts" } });
  if (!users) {
    const error = new Error("Foydalanuvchilar topilmadi");
    error.statusCode = 404;
    return next(error);
  }
  res.json(users);
});

// GET /users/:id
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    const error = new Error("Foydalanuvchi ID bo'yicha topilmadi");
    error.statusCode = 404;
    return next(error);
  }
  res.json(user);
});
// // POST /users
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.create({ username, email });
  if (!user) {
    const error = new Error("Foydalanuvchi yaratilmadi");
    error.statusCode = 404;
    return next(error);
  }

  res.status(201).json(user);
});

// PUT /users/:id
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) {
    const error = new Error("Foydalanuvchi ID bo'yicha yangilanmadi");
    error.statusCode = 404;
    return next(error);
  }
  user.username = username;
  user.email = email;
  await user.save();
  res.status(203).json(user);
});

// DELETE /users/:id
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    const error = new Error("Foydalanuvchi ID bo'yicha o'chirilmadi");
    error.statusCode = 404;
    return next(error);
  }
  await user.destroy();
  res.status(204).json({ message: "Foydalanuvchi o'chirildi" });
});

// restore User
exports.restoreUser = asyncHandler(async (req, res, next) => {
  const deleteUser = await User.findOne({
    where: { id: req.params.id },
    paranoid: false,
  });
  if (!deleteUser) {
    const error = new Error(
      "Foydalanuvchi ID bo'yicha o'chirilgan malumoti tiklanmadi"
    );
    error.statusCode = 404;
    return next(error);
  }
  await deleteUser.restore();
  res.status(200).json(deleteUser);
});
