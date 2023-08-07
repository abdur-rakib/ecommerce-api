require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const {
  errorHandlerMiddleware,
  notFoundMiddleware,
} = require("../api/middlewares");
const { authRouter } = require("../api/routes");
const { logs } = require("../../config/vars");

const app = express();

// middlewares
app.use(morgan(logs));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// routes
// test
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "Welcome to home page" });
});
// auth
app.use("/api/v1/auth", authRouter);

// other middlewares
app.use(notFoundMiddleware);
// error-handler middleware
app.use(errorHandlerMiddleware);

module.exports = app;
