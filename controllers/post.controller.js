const { Post, User } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.findAll({
    include: { model: User, as: "users" },
  });
  if (!posts) {
    const error = new Error("Postlar topilmadi");
    error.statusCode = 404;
    return next(error);
  }
  res.json(posts);
});
