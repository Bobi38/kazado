import { Type, Static } from "@sinclair/typebox";

export const CalendarReturnBool= Type.Object({
  success:  Type.Boolean(),
});

export const Id= Type.Object({
  id:  Type.Number(),
});

export const Data = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export const ReturnMessage = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
});

export const ReturnData = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Array(Data),
});
