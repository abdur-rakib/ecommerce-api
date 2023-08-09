import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import {
  attachCookiesToResponse,
  createTokenUser,
  generateResponse,
} from "../helpers";
import { User } from "../models";
import { loginSchema, registrationSchema } from "../validations";
import { Request, Response } from "express";

// register user
export const register = async (req: Request, res: Response) => {
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
export const login = async (req: Request, res: Response) => {
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

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res
    .status(StatusCodes.OK)
    .json(generateResponse(true, null, "User logged out successfully"));
};
