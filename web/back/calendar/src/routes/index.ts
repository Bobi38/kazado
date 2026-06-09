import { FastifyInstance } from 'fastify';
import {Calendar} from "./calendar/Calendar_routes"

export async function registerRoutes(fastify: FastifyInstance) {

    fastify.register(Calendar, { prefix: '/api/Calendar' });
  //fastify.register(User, { prefix: '/api/User' });
}