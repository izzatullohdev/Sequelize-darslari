require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); // testda true bersa bo‘ladi
    console.log("🟢 DB ulandi va sync qilindi");

    app.listen(PORT, () => {
      console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
    });
  } catch (error) {
    console.error("❌ Serverda muammo:", error.message);
  }
};

startServer();
