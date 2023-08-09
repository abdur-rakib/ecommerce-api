import { Actions } from "../../global.types";

export interface IPermission {
  admin: Actions[];
  user: Actions[];
}
