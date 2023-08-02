const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");

// register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    throw new Error("E-mail already exists");
  }

  const user = await User.create({ name, email, password });
  console.log("🚀 ~ file: auth.controller.js:13 ~ register ~ user:", user);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      user,
    },
  });
};

module.exports = { register };
