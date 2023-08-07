const User = require("../models/user.model");
const createTokenUser = require("../helpers/createTokenUser");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { attachCookiesToResponse } = require("../helpers");
const { registrationSchema, loginSchema } = require("../validations");

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

module.exports = { register, login };
