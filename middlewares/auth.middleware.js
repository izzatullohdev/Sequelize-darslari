const jwt = require("jsonwebtoken");
const authMiddlewarare = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token topilmadi" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token notog'ri yoki mudati o'tgan" });
  }
};

module.exports = authMiddlewarare;
