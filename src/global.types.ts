import { Request } from "express";
import { ObjectId } from "mongodb";

export enum Actions {
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT",
}

export interface ITokenUser {
  name: string;
  userId: ObjectId;
  role: string;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface AuthenticatedRequest extends Request {
  user: ITokenUser;
}
