import Fastify from 'fastify';
import add_db from "./add_db"

const fastify = Fastify({ logger: { level: 'warn' } });

const start = async () => {
  try {
    await add_db()

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}


start()