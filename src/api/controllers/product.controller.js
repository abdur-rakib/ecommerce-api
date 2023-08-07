const { StatusCodes } = require("http-status-codes");
const { generateResponse } = require("../helpers");
const { Product } = require("../models");
const { createProductSchema } = require("../validations");
const { BadRequestError } = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  // validate product payload
  const { error, value } = createProductSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.message);
  }
  const product = await Product.create(value);
  res.status(StatusCodes.CREATED).json(generateResponse(true, product));
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(generateResponse(true, products));
};

module.exports = { createProduct, getAllProducts };
