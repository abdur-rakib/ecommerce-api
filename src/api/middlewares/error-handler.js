const { StatusCodes } = require("http-status-codes");
const generateResponse = require("../helpers/generateResponse");

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong try again later";

  return res.status(statusCode).json(generateResponse(false, message));
};

module.exports = errorHandlerMiddleware;
