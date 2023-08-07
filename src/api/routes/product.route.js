const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controller");
const { authenticateUser, authorizePermissions } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, getAllProducts)
  .post(
    [authenticateUser, authorizePermissions("CREATE_PRODUCT")],
    createProduct
  );

module.exports = router;
