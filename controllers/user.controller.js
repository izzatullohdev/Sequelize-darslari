const { User, Post } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: { model: Post, as: "posts" } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};
