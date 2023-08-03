require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
