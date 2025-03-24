const { Op } = require("sequelize");
const sequelize = require("./config/database");
const User = require("./models/user.model");
(async () => {
  try {
    await sequelize.authenticate();
    console.info("Databasega ulandi");
    await sequelize.sync({ force: false });
    console.info("Database yaratildi");
  } catch (err) {
    console.error("Xatolik yuz berdi :", err);
  }
})();

(async () => {
  try {
    const newUser = await User.create({
      username: "ho",
      email: "holid31",
    });
    console.log("Yangi foydalanuvchi yaratildi:", newUser.toJSON());
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      err.errors.forEach((error) => {
        console.error("Validation xatoligi:", error.message);
      });
    }
    console.error("Nomalum xatolik yuz berdi :", err.message);
  }
})();

// findAll()
// (async () => {
//   try {
//     const users = await User.findAll({
//       where: { username: "holid28" },
//       limit: 2,
//       order: [["createdAt", "DESC"]],
//       attributes: ["id", "username"],
//     });
//     console.log(
//       "Foydalanuvchilar ro'yxati:",
//       users.map((u) => u.toJSON())
//     );
//   } catch (err) {
//     console.error("Xatolik yuz berdi :", err.message);
//   }
// })();

// findOne()
// (async () => {
//   try {
//     const user = await User.findOne({
//       where: { email: "holid32@example.com" },
//     });
//     console.log("Topilgan foydalanuvchi:", user?.toJSON());
//   } catch (err) {
//     console.error("Xatolik yuz berdi :", err.message);
//   }
// })();

// findByPk();
// (async () => {
//   try {
//     const user = await User.findByPk(100);
//     if (!user) {
//       console.log("Foydalanuvchi topilmadi");
//     } else {
//       console.log("ID bo‘yicha topilgan foydalanuvchi:", user.toJSON());
//     }
//   } catch (err) {
//     console.error("Xatolik yuz berdi :", err.message);
//   }
// })();

// count()
// (async () => {
//   try {
//     const count = await User.count();
//     console.log("Jami foydalanuvchilar soni:", count);
//   } catch (err) {
//     console.error("Xatolik yuz berdi :", err.message);
//   }
// })();

// (async () => {
//   try {
//     const gmailUsers = await User.count({
//       where: {
//         email: {
//           [Op.like]: "%@example.com",
//         },
//       },
//     });
//     if (gmailUsers > 0) {
//       console.log("Example foydalanuvchilari soni:", gmailUsers);
//     } else {
//       console.log("Example foydalanuvchilari yo'q");
//     }
//   } catch (err) {
//     console.error("Xatolik yuz berdi :", err.message);
//   }
// })();
