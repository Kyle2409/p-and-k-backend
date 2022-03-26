const db = require("../models");
const User = db.user;

getcartUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

module.exports = getcartUser;
