const User = require("./user.model");
const Post = require("./post.model");

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "users" });

module.exports = { User, Post };
