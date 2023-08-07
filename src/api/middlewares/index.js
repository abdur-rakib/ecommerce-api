const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./not-found");
const { authenticateUser, authorizePermissions } = require("./authentication");

module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authenticateUser,
  authorizePermissions,
};
