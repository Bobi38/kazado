import { Type, Static } from "@sinclair/typebox";

export const CalendarReturnBool= Type.Object({
  success:  Type.Boolean(),
});

export const Id= Type.Object({
  calendar:  Type.String(),
});

export const IdCalHome= Type.Object({
  calendar:  Type.String(),
});

export const ParamsHome= Type.Object({
  id:  Type.String(),
});

export const Data = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.Optional(Type.String()),
  adm: Type.Optional(Type.Boolean()),
  nb_people: Type.Optional(Type.Number()),
  nb_bedroom: Type.Optional(Type.Number()),
  adress: Type.Optional(Type.String()),
  isToDo: Type.Optional(Type.Boolean()),
});

export const DataNumber = Type.Object({
  id: Type.Number(),
  name: Type.String(),
});

export const ReturnMessage = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
});

export const ReturIdCal = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  id: Type.String(),
});


export const ReturnData = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Array(Data),
});

export const ReturnDataNumber = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Array(Data),
});

export const ReturnBool= Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  bool: Type.String(),
});

export const BodyCal = Type.Object({
  validator: Type.Boolean(),
  name: Type.String(),
});

export const BodyHome = Type.Object({
  nb_people: Type.Number(),
  nb_bedroom: Type.Number(),
  adress: Type.String(),
  name: Type.String(),
  tasksArray: Type.Array(Type.String())
});

export const RBodyHome = Type.Object({
  nb_people: Type.Number(),
  nb_bedroom: Type.Number(),
  adress: Type.String(),
  name: Type.String(),
  tasksArray: Type.String()
});

export const ReturnBodyHome = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Union([RBodyHome, Type.Null()]),
})