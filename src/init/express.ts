import { vars } from "../../config/vars";
import express from "express";
import morgan from "morgan";

require("express-async-errors");
const cookieParser = require("cookie-parser");
const {
  errorHandlerMiddleware,
  notFoundMiddleware,
} = require("../api/middlewares");
const { authRouter, productRouter } = require("../api/routes");

const { logs } = vars;

export const app = express();

// middlewares
app.use(morgan(logs));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// routes
// test
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "Welcome to home page (TypeScript)" });
});
// auth
app.use("/api/v1/auth", authRouter);
// product
app.use("/api/v1/product", productRouter);

// other middlewares
app.use(notFoundMiddleware);
// error-handler middleware
app.use(errorHandlerMiddleware);
