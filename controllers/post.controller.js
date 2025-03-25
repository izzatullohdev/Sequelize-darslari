const { Post, User } = require("../models");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: { model: User, as: "users" },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server xatoligi", error: error.message });
  }
};
