const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Sequelize ORM backend ishlayapti!");
});

module.exports = app;
