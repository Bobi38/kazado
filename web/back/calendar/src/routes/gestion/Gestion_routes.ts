import { FastifyInstance } from 'fastify';
import * as GestionSchema from './Gestion_schema';
import { GestionController } from './Gestion_controllers';
import { GestionService } from './Gestion_service';
import * as H from '../hook';

export async function Gestion(fastify: FastifyInstance) {
    const service = new GestionService();
    const controller = new GestionController(service);

    fastify.post('/Validator', {schema: {query: GestionSchema.Id ,response: {200: GestionSchema.ReturnMessage}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkNewRole, H.checkAdm("Validator")]},
    controller.addVal)
    fastify.post('/Adm', {schema: {query: GestionSchema.Id ,response: {200: GestionSchema.ReturnMessage}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkNewRole, H.checkAdm("Admin")]},
    controller.addAdm)
}
