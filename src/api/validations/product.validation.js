const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createProductSchema = Joi.object({
  name: Joi.string().required().max(100),
  price: Joi.number().required().default(0),
  description: Joi.string().required().max(1000),
  inventory: Joi.number().required().default(15),
  user: Joi.objectId().required(),
});

module.exports = { createProductSchema };
