const User = require("../models/user.model");
const createTokenUser = require("../helpers/createTokenUser");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { attachCookiesToResponse, generateResponse } = require("../helpers");
const { registrationSchema, loginSchema } = require("../validations");
const { StatusCodes } = require("http-status-codes");

// register user
const register = async (req, res) => {
  const { error, value } = registrationSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.message);
  }

  const isEmailAlreadyExists = await User.findOne({ email: req.body.email });
  if (isEmailAlreadyExists) {
    throw new Error("E-mail already exists");
  }

  const user = await User.create(value);
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse(res, tokenUser);
};

// login user
const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.message);
  }

  const user = await User.findOne({ email: value.email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(value.password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expiresIn: new Date(Date.now),
  });
  res
    .status(StatusCodes.OK)
    .json(generateResponse(true, null, "User logged out successfully"));
};

module.exports = { register, login, logout };
