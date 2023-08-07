const { permissions } = require("../constants");
const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../helpers");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const user = isTokenValid(token);
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (operation) => {
  return (req, res, next) => {
    if (permissions[req.user.role].includes(operation)) {
      next();
    } else {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
  };
};

module.exports = { authenticateUser, authorizePermissions };
