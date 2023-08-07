const { registrationSchema, loginSchema } = require("./auth.validation");
const { createProductSchema } = require("./product.validation");

module.exports = { registrationSchema, loginSchema, createProductSchema };
