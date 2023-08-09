import { IResponse } from "./helpers.types";

export const generateResponse = (
  success: boolean,
  data: any = null,
  message: string = null
): IResponse => {
  if (success) {
    return {
      success: true,
      data,
      message,
    };
  } else {
    return {
      success: false,
      message: message,
    };
  }
};
