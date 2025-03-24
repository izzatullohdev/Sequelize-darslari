const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("darslaruchun", "postgres", "0507", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  port: 5432,
});

module.exports = sequelize;
