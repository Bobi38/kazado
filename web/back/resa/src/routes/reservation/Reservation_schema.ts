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

export const DataResa= Type.Object({
  name: Type.String(),
  start: Type.String(),
  end: Type.String(),
  status: Type.String(),
  name_cal: Type.String(),
  calId: Type.String(),
  homes: Type.String(),
})

export const ReturnDataResa = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Array(DataResa),
})

export const DataResaAdm= Type.Object({
  name: Type.String(),
  id_resa: Type.Number(),
  start: Type.String(),
  end: Type.String(),
  name_cal: Type.String(),
  homes: Type.String(),
  user: Type.String(),
  nb_adult: Type.Number(),
  nb_children: Type.Number()
})

export const ReturnDataResaAdm = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Array(DataResaAdm),
})