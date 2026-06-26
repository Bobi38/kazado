import { Type, Static } from "@sinclair/typebox";

export const CalendarReturnBool= Type.Object({
  success:  Type.Boolean(),
});

export const data= Type.Object({
  id:  Type.String(),
  name_user: Type.String(),
  name_calendar: Type.String(),
  calendarId: Type.String(),
});


export const ReturnMessage = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
});

export const ReturnData = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Array(data),
});

export const ReturnBool= Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  bool: Type.String(),
});