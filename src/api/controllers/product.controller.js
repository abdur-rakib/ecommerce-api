const { StatusCodes } = require("http-status-codes");
const { generateResponse } = require("../helpers");
const { Product } = require("../models");
const { createProductSchema } = require("../validations");
const { BadRequestError, NotFoundError } = require("../errors");

// create product controller
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const { error, value } = createProductSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.message);
  }
  const product = await Product.create(value);
  res.status(StatusCodes.CREATED).json(generateResponse(true, product));
};

// get all product list
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(generateResponse(true, products));
};

// get single product
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json(generateResponse(true, product));
};

// update single product
const updateSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json(generateResponse(true, product));
};

// delete single product
const deleteSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  await product.deleteOne();
  res
    .status(StatusCodes.OK)
    .json(generateResponse(true, null, "Success! Product removed."));
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
