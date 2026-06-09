import { FastifyInstance, FastifyReply } from 'fastify';
import {Secu} from "./secu/Secu_routes"
import {User} from "./user/User_routes"
import fs from "fs"

const status = process.env.STATUS

export const secret = fs.readFileSync('/run/secrets/cle_pswd', 'utf-8').trim();

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(User, { prefix: '/user' });
  fastify.register(Secu, { prefix: '/secu' });
}


export function generateToken(MPFA: boolean, token: string, res: FastifyReply) {
  if (MPFA) {
    if (status === "prod")
      return res.cookie('temp', token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict', maxAge: 12 * 60 * 60 * 1000 });
    else
      return res.cookie('temp', token, { path: '/', httpOnly: true, secure: false, sameSite: 'lax', maxAge: 12 * 60 * 60 * 1000 });
  }else{
    if (status === "prod")
      return res.cookie('auth', token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict', maxAge: 12 * 60 * 60 * 1000 });
    else
      return res.cookie('auth', token, { path: '/', httpOnly: true, secure: false, sameSite: 'lax', maxAge: 12 * 60 * 60 * 1000 });
  }
}