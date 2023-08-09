import { ObjectId } from "mongodb";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  _id?: ObjectId;
}
