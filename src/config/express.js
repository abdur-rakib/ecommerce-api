require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const { logs } = require("./vars");
const notFound = require("../api/middlewares/not-found");
const errorHandlerMiddleware = require("../api/middlewares/error-handler");
const authRouter = require("../api/routes/auth.route");

const app = express();

// middlewares
app.use(morgan(logs));
app.use(express.json());

// routes
// test
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "Welcome to home page" });
});
// auth
app.use("/api/v1/auth", authRouter);

// other middlewares
app.use(notFound);
// error-handler middleware
app.use(errorHandlerMiddleware);

module.exports = app;
