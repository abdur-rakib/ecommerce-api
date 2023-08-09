import { ITokenUser } from "../../global.types";
import { IUser } from "../models/model.types";

export const createTokenUser = (user: IUser): ITokenUser => ({
  name: user.name,
  userId: user._id,
  role: user.role,
});
