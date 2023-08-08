const {
  getSingleProduct,
  getAllProducts,
  createProduct,
} = require("./product.controller");
const { login, register } = require("./auth.controller");

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  login,
  register,
};
