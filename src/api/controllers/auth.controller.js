const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const generateResponse = require("../helpers/generateResponse");
const { registrationSchema } = require("../validations/auth.validation");
const createTokenUser = require("../helpers/createTokenUser");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { attachCookiesToResponse } = require("../helpers");

// register user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    throw new Error("E-mail already exists");
  }

  const user = await User.create({ name, email, password });
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse(res, tokenUser);
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);
};

module.exports = { register, login };
