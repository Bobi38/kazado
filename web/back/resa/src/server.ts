import socketPlugin from './initServerSocket.ts';
import Fastify from 'fastify';
import { registerRoutes } from './routes/index.ts';
import fastifyCookie from '@fastify/cookie';
import {prisma} from './lib/prisma.ts'
import fs from "fs"
import jwt from "jsonwebtoken";

export const secret = fs.readFileSync('/run/secrets/cle_pswd', 'utf-8').trim();

declare module 'fastify' {
  interface FastifyRequest {
    user?: number; 
  }
}

const fastify = Fastify({ logger: { level: 'warn' } });

async function callPath(req: any, rep:any){
  console.log("WELCOME to RESA")
  console.log(req.url)
  const token = req.cookies.auth;
  try{
    const decoded = jwt.verify(token, secret) as { id: number };
    req.user = decoded.id;
  }catch(err){
    return rep.status(401).send({ success: false, message: `Token invalide` });
  }
  console.log(req.user)
}

fastify.addHook('onClose', async (instance) => {
  await prisma.$disconnect()
})

const start = async () => {
  try {
    await fastify.register(fastifyCookie);
    await fastify.addHook('preHandler', callPath);
    fastify.register(registerRoutes);
    await fastify.register(socketPlugin);
    await fastify.listen({ port: 9102, host: '0.0.0.0' })
    console.log("SERVER resa good ")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

start()