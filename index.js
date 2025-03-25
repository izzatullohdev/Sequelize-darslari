const sequelize = require("./config/database");
const { User, Post } = require("./models");
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.info("Databasega ulandi");
//     await sequelize.sync({ force: false });
//     console.info("Database yaratildi");

//     // User yaratish
//     const user = await User.create({
//       username: "holid",
//       email: "holid28@example.com",
//     });

//     // Post yaratish
//     await Post.create({
//       title: "Post title - 1",
//       body: "Post body",
//       userId: user.id,
//     });
//     await Post.create({
//       title: "Post title - 2",
//       body: "Post body",
//       userId: user.id,
//     });
//     // include orqali user'ni postlari bilan birga olish

//   } catch (err) {
//     console.error("Xatolik yuz berdi :", err);
//   }
// })();

(async () => {
  try {
    const users = await User.findAll({
      include: {
        model: Post,
        as: "posts",
      },
    });
    users.forEach((user) => {
      console.info("👤", user.username);
      user.posts.forEach((post) => {
        console.info("📝", post.title);
      });
    });
  } catch (err) {
    console.log("Xatolik");
  }
})();
