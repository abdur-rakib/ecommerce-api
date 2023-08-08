const { StatusCodes } = require("http-status-codes");
const generateResponse = require("../helpers/generateResponse");

const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong try again later";
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    statusCode = 400;
  }

  if (err.name === "CastError") {
    message = `No item found with id : ${err.value}`;
    statusCode = 404;
  }

  return res.status(statusCode).json(generateResponse(false, null, message));
};

module.exports = errorHandlerMiddleware;
