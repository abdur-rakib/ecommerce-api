const {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateSingleProduct,
} = require("./product.controller");
const { login, register } = require("./auth.controller");

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateSingleProduct,
  login,
  register,
};
