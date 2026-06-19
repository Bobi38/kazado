
import Fastify from 'fastify';
import init_db from './init_template.ts';

const fastify = Fastify({ logger: { level: 'warn' } });

const start = async () => {
  try {
    await init_db()
    console.log("SERVER User running ")
  } catch (err) {
    fastify.log.error(err)
  }
}


start()