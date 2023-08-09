import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { Product } from "../models";
import { createProductSchema } from "../validations";
import { generateResponse } from "../helpers";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../global.types";

// create product controller
export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  req.body.user = req.user.userId;
  const { error, value } = createProductSchema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.message);
  }
  const product = await Product.create(value);
  res.status(StatusCodes.CREATED).json(generateResponse(true, product));
};

// get all product list
export const getAllProducts = async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  const products = await Product.find({})
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  const count = await Product.count();
  const data = {
    products,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
    total: count,
  };
  res
    .status(StatusCodes.OK)
    .json(generateResponse(true, data, "Get all products"));
};

// get single product
export const getSingleProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json(generateResponse(true, product));
};

// update single product
export const updateSingleProduct = async (req: Request, res: Response) => {
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
export const deleteSingleProduct = async (req: Request, res: Response) => {
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
