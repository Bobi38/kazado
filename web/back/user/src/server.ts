
import Fastify from 'fastify';
import { registerRoutes } from './routes/index.ts';
import prisma from './lib/prisma'

const fastify = Fastify({ logger: { level: 'warn' } });



fastify.addHook('onClose', async (instance) => {
  await prisma.$disconnect()
})

const start = async () => {
  try {
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