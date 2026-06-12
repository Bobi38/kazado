
import Fastify from 'fastify';
import { registerRoutes } from './routes/index.ts';
import fastifyCookie from '@fastify/cookie';
import prisma from './lib/prisma'
import { errorHandler } from './routes/preHandler/errorHandler.ts';
import fs from "fs"

const fastify = Fastify({ logger: { level: 'warn' } });
// export const secretTOK = fs.readFileSync('/run/secrets/cle_pswd', 'utf-8').trim();

async function callPath(req: any, rep:any){
  console.log("WELCOME to USER")
  console.log(req.url)
}

fastify.addHook('onClose', async (instance) => {
  await prisma.$disconnect()
})

const start = async () => {
  try {
    await fastify.register(fastifyCookie);
    fastify.addHook('onRequest', callPath);
    fastify.setErrorHandler(errorHandler);
    fastify.register(registerRoutes);
    await fastify.listen({ port: 9101, host: '0.0.0.0' })
    console.log("SERVER User running ")

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