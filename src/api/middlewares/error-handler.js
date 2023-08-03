const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(
    "🚀 ~ file: error-handler.js:9 ~ errorHandlerMiddleware ~ err:",
    err
  );
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  return res.status(customError.statusCode).json(customError);
};

module.exports = errorHandlerMiddleware;
