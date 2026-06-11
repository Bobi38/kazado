import { Type, Static } from "@sinclair/typebox";

export const ReservationReturnMessage= Type.Object({
  success:  Type.Boolean(),
  message: Type.String()
})

export const IncomeReservation= Type.Object({
  name: Type.String(),
  date_start: Type.String(),
  date_end: Type.String(),
  nb_adult: Type.Number(),
  nb_children: Type.Number(),
  Home: Type.Array(Type.Number()),
  Invit: Type.Array(Type.Number())
})

export const IncomeCalendar= Type.Object({
  calendar: Type.String(),
  start: Type.String(),
  end: Type.String(),
})