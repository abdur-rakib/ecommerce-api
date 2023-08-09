require("dotenv").config();
import { IVars } from "./config.types";

export const vars: IVars = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
