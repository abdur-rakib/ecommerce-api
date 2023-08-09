import Joi from "joi";

export const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
