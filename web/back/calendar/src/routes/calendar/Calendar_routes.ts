import { FastifyInstance } from 'fastify';
import * as CalendarSchema from './Calendar_schema';
import { CalendarController } from './Calendar_controllers';
import { CalendarService } from './Calendar_service';
import * as H from '../preHandler/hook';

export async function Calendar(fastify: FastifyInstance) {
    const service = new CalendarService();
    const controller = new CalendarController(service);

    fastify.get('/getMy', {schema: {response: {200: CalendarSchema.ReturnData}}},
    controller.myCal)
    fastify.post('/Home', {schema: {query: CalendarSchema.Id, body: CalendarSchema.BodyHome ,response: {200: CalendarSchema.ReturnMessage}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkAdm("Home"), H.checkHomeName]},
    controller.addHome)
    fastify.patch('/home/:id', {schema: {query: CalendarSchema.Id, body: CalendarSchema.BodyHome ,response: {200: CalendarSchema.ReturnMessage}},
        preHandler: [H.checkCal, H.checkUser, H.checkHome, H.checkAdm("Home"), H.checkHomeName]},
    controller.patchHome)
    fastify.delete('/home/:id', {schema: {query: CalendarSchema.Id, body: CalendarSchema.BodyHome ,response: {200: CalendarSchema.ReturnMessage}},
        preHandler: [H.checkCal, H.checkUser, H.checkHome, H.checkAdm("Home")]},
    controller.patchHome)
    fastify.post('/Calendar', {schema: {body: CalendarSchema.BodyCal ,response: {200: CalendarSchema.ReturIdCal}}, },
    controller.addCal)
    fastify.get('/AllHomes', {schema: {response: {200: CalendarSchema.ReturnDataNumber}}, preHandler: H.checkCal },
    controller.allHomes)
    fastify.get('/AllUsers', {schema: {response: {200: CalendarSchema.ReturnDataNumber}}, preHandler: H.checkCal },
    controller.allUsers)
    fastify.get('/home/:id', {schema: {params: CalendarSchema.ParamsHome, query: CalendarSchema.Id ,response: {200: CalendarSchema.ReturnBodyHome}},
        preHandler: [H.checkCal, H.checkUser, H.checkHome, H.checkAdm("Home")] },
    controller.infoHome)

}
