import { Type, Static } from "@sinclair/typebox";

export const UserReturnBool= Type.Object({
  success:  Type.Boolean(),
})

export const UserReturnMess= Type.Object({
  success:  Type.Boolean(),
  message: Type.String(),
})

export const UserForget= Type.Object({
  email: Type.String({ format: 'email' }),
})

export const ReturnToken= Type.Object({
  success:  Type.Boolean(),
  message: Type.String(),
})


export const UserPost= Type.Object({
  email: Type.String({ format: 'email' }),
  username: Type.String({ minLength: 3, pattern: "^[a-zA-Z0-9_]+$" }),
  password: Type.String({
    minLength: 4,
    pattern: '(?=.*[A-Z])(?=.*[0-9])'
  }),
})

export const UserLogin= Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({minLength: 4}),
})

export const UserReset= Type.Object({
  token: Type.String(),
  password: Type.String({
    minLength: 4,
    pattern: '(?=.*[A-Z])(?=.*[0-9])'
  }),
})