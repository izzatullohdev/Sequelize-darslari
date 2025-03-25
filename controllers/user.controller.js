const { User, Post } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: { model: Post, as: "posts" } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
// // POST /users
exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    console.error("Serverda xatolik", error.message);
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }
    user.username = username;
    user.email = email;
    await user.save();
    res.status(203).json(user);
  } catch (error) {
    console.error("Serverda xatolik", error.message);
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }
    await user.destroy();
    res.status(204).json({ message: "Foydalanuvchi o'chirildi" });
  } catch (error) {
    console.error("Serverda xatolik", error.message);
  }
};
