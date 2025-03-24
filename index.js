const sequelize = require("./config/database");
require("./models/user.model");
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
