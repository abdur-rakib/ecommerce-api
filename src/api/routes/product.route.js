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

router
  .route("/")
  .get(authenticateUser, getAllProducts)
  .post(
    [authenticateUser, authorizePermissions("CREATE_PRODUCT")],
    createProduct
  );

router
  .route("/:id")
  .get(authenticateUser, getSingleProduct)
  .patch(
    authenticateUser,
    authorizePermissions("UPDATE_PRODUCT"),
    updateSingleProduct
  )
  .delete(
    authenticateUser,
    authorizePermissions("DELETE_PRODUCT"),
    deleteSingleProduct
  );

module.exports = router;
