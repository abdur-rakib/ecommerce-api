const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const generateResponse = require("../helpers/generateResponse");

// register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    throw new Error("E-mail already exists");
  }

  const user = await User.create({ name, email, password });

  res.status(StatusCodes.CREATED).json(generateResponse(true, user));
};

module.exports = { register };
