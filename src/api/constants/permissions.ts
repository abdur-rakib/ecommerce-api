import { Actions } from "../../global.types";
import { IPermission } from "./constants.types";

export const permissions: IPermission = {
  admin: [
    Actions.CREATE_PRODUCT,
    Actions.UPDATE_PRODUCT,
    Actions.DELETE_PRODUCT,
    Actions.GET_PRODUCTS,
    Actions.GET_SINGLE_PRODUCT,
  ],
  user: [Actions.GET_PRODUCTS, Actions.GET_SINGLE_PRODUCT],
};
