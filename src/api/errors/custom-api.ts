import { IError } from "./errors.types";

export class CustomAPIError extends Error implements IError {
  constructor(message: string) {
    super(message);
  }
}
