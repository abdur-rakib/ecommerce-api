const express = require("express");
const morgan = require("morgan");
const { logs } = require("./vars");
const notFound = require("../../api/middlewares/not-found");

const app = express();

// middlewares
app.use(morgan(logs));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  console.log({ req });
  res.status(200).json({ message: "Welcome to home page" });
});

// other middlewares
app.use(notFound);

module.exports = app;
