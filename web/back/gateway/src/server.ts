
import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';
import fastifyCookie from '@fastify/cookie';
import fs from "fs"
import jwt from "jsonwebtoken";

declare module 'fastify' {
  interface FastifyRequest {
    user?: { id: number };
  }
}

export const secretTOK = fs.readFileSync('/run/secrets/cle_pswd', 'utf-8').trim();
const fastify = Fastify({ logger: { level: 'warn' } });


async function MiddCoocki(req:FastifyRequest, rep:FastifyReply){
    const token = req.cookies.auth;
    console.log("coucou")
    if (!token) {
        return rep.status(401).send({ success: false, message: `Token doesn't exist` });
    }
    try{
        const decoded = jwt.verify(token, secretTOK) as { id: number };
        req.user = decoded;
    }catch(err){
        return rep.status(401).send({ success: false, message: `Token invalide` });
    }
}

async function callPath(req: FastifyRequest, rep:FastifyReply){
  console.log("WELCOME to gateaway")
  console.log(req.url)
}

const start = async () => {
  try {
    await fastify.register(fastifyCookie);
    fastify.addHook('onRequest', callPath);
    await fastify.register(fastifyHttpProxy, {
      upstream: 'http://user:9101',
      prefix: '/api/user',
      rewritePrefix: '/user',
    });

    await fastify.register(fastifyHttpProxy, {
      upstream: 'http://user:9101',
      prefix: '/api/secu',
      rewritePrefix: '/secu',
    });
    await fastify.register(async (securedContext) => {


      securedContext.addHook('onRequest', MiddCoocki);

      await securedContext.register(fastifyHttpProxy, {
        upstream: 'http://resa:9102',
        prefix: '/api/resa',
        rewritePrefix: '/resa',
      });
      await securedContext.register(fastifyHttpProxy, {
        upstream: 'http://calendar:9103',
        prefix: '/api/calendar',
        rewritePrefix: '/calendar',
      });
    });
    await fastify.listen({ port: 9100, host: '0.0.0.0' })
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