import express from "express";
import { authenticateUser, authorizePermissions } from "../middlewares";
import {
  createProduct,
  deleteSingleProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
} from "../controllers";
import { Actions } from "../../global.types";

export const productRouter = express.Router();

productRouter.use(authenticateUser);

productRouter
  .route("/")
  .get(getAllProducts)
  .post([authorizePermissions(Actions.CREATE_PRODUCT)], createProduct);

productRouter
  .route("/:id")
  .get(getSingleProduct)
  .patch(authorizePermissions(Actions.UPDATE_PRODUCT), updateSingleProduct)
  .delete(authorizePermissions(Actions.DELETE_PRODUCT), deleteSingleProduct);
