import { Type, Static } from "@sinclair/typebox";

export const ReservationReturnMessage= Type.Object({
  success:  Type.Boolean(),
  message: Type.String()
})

export const IncomeReservation= Type.Object({
  name: Type.String(),
  Date_start: Type.String(),
  Date_end: Type.String(),
  nb_adult: Type.Number(),
  nb_children: Type.Number(),
  Home: Type.Array(Type.Number()),
  Invit: Type.Array(Type.Number())
})