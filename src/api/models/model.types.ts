import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
