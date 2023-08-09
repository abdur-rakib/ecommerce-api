import { NextFunction, Response } from "express";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "../helpers";
import { Actions, AuthenticatedRequest, ITokenUser } from "../../global.types";
import { permissions } from "../constants";
import { UnauthorizedError } from "../errors/unauthorized";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const user = isTokenValid(token);
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (operation: Actions) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (permissions[req.user.role].includes(operation)) {
      next();
    } else {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
  };
};
