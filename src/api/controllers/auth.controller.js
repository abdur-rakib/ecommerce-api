const { StatusCodes } = require("http-status-codes");

// register user
const register = async (req, res) => {
  const { body } = req;
  res.status(StatusCodes.CREATED).json({
    body,
  });
};

module.exports = { register };
