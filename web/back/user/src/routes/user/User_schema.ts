import { Type, Static } from "@sinclair/typebox";

export const UserReturnBool= Type.Object({
  success:  Type.Boolean(),
})

export const UserReturnMess= Type.Object({
  success:  Type.Boolean(),
  message: Type.String(),
})


export const UserPost= Type.Object({
  email: Type.String({ format: 'email' }),
  username: Type.String({ minLength: 3 }),
  password: Type.String({
    minLength: 4,
    pattern: '(?=.*[A-Z])(?=.*[0-9])'
  }),
})

export const UserLogin= Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({minLength: 4}),
})