const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(errorHandler); //next(error) throw new Error("Xatolik")
app.get("/", (req, res) => {
  res.send("Sequelize ORM backend ishlayapti!");
});

module.exports = app;
