import { FastifyInstance } from 'fastify';
import * as CalendarSchema from './Calendar_schema';
import { CalendarController } from './Calendar_controllers';
import { CalendarService } from './Calendar_service';
import * as H from './hook';

export async function Calendar(fastify: FastifyInstance) {
    const service = new CalendarService();
    const controller = new CalendarController(service);

    fastify.get('/getMy', {schema: {query: CalendarSchema.Id ,response: {200: CalendarSchema.test}}},
    controller.myCal)
    fastify.post('/addValidator', {schema: {query: CalendarSchema.Id ,response: {200: CalendarSchema.test}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkNewRole, H.checkAdm("Validator")]},
    controller.addVal)
    fastify.post('/addAdm', {schema: {query: CalendarSchema.Id ,response: {200: CalendarSchema.test}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkNewRole, H.checkAdm("Admin")]},
    controller.addAdm)
    fastify.post('/addHome', {schema: {query: CalendarSchema.Id ,response: {200: CalendarSchema.test}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkAdm("Home")]},
    controller.addHome)
    fastify.post('/addCalendar', {schema: {query: CalendarSchema.Id ,response: {200: CalendarSchema.test}}, },
    controller.addCal)
}
