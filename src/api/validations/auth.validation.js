const Joi = require("joi");

const registrationSchema = Joi.object().keys({
  name: Joi.string().required,
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = { registrationSchema };
