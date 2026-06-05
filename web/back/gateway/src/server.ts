
import Fastify from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';

const fastify = Fastify({ logger: { level: 'warn' } });

async function test(request:any, reply:any){
  console.log("coucou je suis le middleware")
}

const start = async () => {
  try {
    await fastify.register(fastifyHttpProxy, {
      upstream: 'http://user:9101',
      prefix: '/api/user',
      rewritePrefix: '/user',
    });
    await fastify.register(async (securedContext) => {


      securedContext.addHook('preHandler', test);

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