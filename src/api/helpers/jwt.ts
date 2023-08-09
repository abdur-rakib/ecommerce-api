import jwt from "jsonwebtoken";
import { ITokenUser } from "../../global.types";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateResponse } from "./generateResponse";

export const createJWT = (payload: ITokenUser): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = (token: string): ITokenUser =>
  jwt.verify(token, process.env.JWT_SECRET) as ITokenUser;

export const attachCookiesToResponse = (res: Response, user: ITokenUser) => {
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.status(StatusCodes.CREATED).json(generateResponse(true, user));
};
