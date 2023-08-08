const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
} = require("../controllers");
const { authenticateUser, authorizePermissions } = require("../middlewares");

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  .get(getAllProducts)
  .post([authorizePermissions("CREATE_PRODUCT")], createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authorizePermissions("UPDATE_PRODUCT"), updateSingleProduct)
  .delete(authorizePermissions("DELETE_PRODUCT"), deleteSingleProduct);

module.exports = router;
