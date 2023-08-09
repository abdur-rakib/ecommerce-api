import { StatusCodes } from "http-status-codes";
import { generateResponse } from "../helpers";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong try again later";
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item: { message: string }) => item.message)
      .join(", ");
    statusCode = 400;
  }

  if (err.name === "CastError") {
    message = `No item found with id : ${err.value}`;
    statusCode = 404;
  }

  return res.status(statusCode).json(generateResponse(false, null, message));
};
