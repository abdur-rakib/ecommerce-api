const {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateSingleProduct,
  deleteSingleProduct,
} = require("./product.controller");
const { login, register, logout } = require("./auth.controller");

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateSingleProduct,
  deleteSingleProduct,
  login,
  register,
  logout,
};
