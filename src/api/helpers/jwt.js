const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const generateResponse = require("./generateResponse");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = (res, user) => {
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  res.status(StatusCodes.CREATED).json(generateResponse(true, user));
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
