const permissions = {
  admin: [
    "CREATE_PRODUCT",
    "UPDATE_PRODUCT",
    "DELETE_PRODUCT",
    "GET_PRODUCTS",
    "GET_SINGLE_PRODUCT",
  ],
  user: ["GET_PRODUCTS", "GET_SINGLE_PRODUCT"],
};

module.exports = { permissions };
