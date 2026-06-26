import { FastifyInstance } from 'fastify';
import {Calendar} from "./calendar/Calendar_routes"
import {Gestion} from "./gestion/Gestion_routes"
import { Invitation } from './invitation/Invitation_routes';



export async function registerRoutes(fastify: FastifyInstance) {

    fastify.register(Calendar, { prefix: '/calendar' });
    fastify.register(Gestion, { prefix: '/gestion' });
    fastify.register(Invitation, { prefix: '/invitation' });
  //fastify.register(User, { prefix: '/api/User' });
}