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
      username: "holid28",
      email: "holid28@example.com",
    });
    console.log("Yangi foydalanuvchi yaratildi:", newUser.toJSON());
  } catch (err) {
    console.error("Xatolik yuz berdi :", err.message);
  }
})();
