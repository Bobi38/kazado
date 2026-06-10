import { FastifyInstance } from 'fastify';
import {Reservation} from "./reservation/Reservation_routes"

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(Reservation, { prefix: '/api/Reservation' });
  //fastify.register(User, { prefix: '/api/User' });
}