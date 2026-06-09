import { Type, Static } from "@sinclair/typebox";

export const SecuReturnBool= Type.Object({
  success:  Type.Boolean(),
  message: Type.String(),
})