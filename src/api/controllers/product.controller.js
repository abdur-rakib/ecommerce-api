const { StatusCodes } = require("http-status-codes");
const { generateResponse } = require("../helpers");
const { Product } = require("../models");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(generateResponse(true, product));
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(generateResponse(true, products));
};

module.exports = { createProduct, getAllProducts };
