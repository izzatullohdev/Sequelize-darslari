const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: [3, 20],
        isAlpha: true,
        is: /^[a-zA-Z0-9]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        isLongEnough: (value) => {
          if (value.length < 8) {
            throw new Error("Password must be at least 8 characters long");
          }
        },
      },
    },
  },
  {
    hooks:{
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: "users",
  }
);
module.exports = User;
