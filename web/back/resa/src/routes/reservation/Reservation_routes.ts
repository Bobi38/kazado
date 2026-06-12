import { FastifyInstance } from 'fastify';
import * as ReservationSchema from './Reservation_schema';
import { ReservationController } from './Reservation_controllers';
import { ReservationService } from './Reservation_service';
import * as H from '../preHandler/hook';

export async function Reservation(fastify: FastifyInstance) {
    const service = new ReservationService();
    const controller = new ReservationController(service);

    fastify.post('/reservation', {schema: {body: ReservationSchema.IncomeReservation, response: {200: ReservationSchema.ReservationReturnMessage}}, 
        preHandler: [H.checkCal, H.checkUser, H.checkDate]},
    controller.addReservation)
    fastify.get('/reservation', {schema: {query: ReservationSchema.IncomeCalendar, response: 200}, 
        preHandler: [H.checkCal, H.checkUser]},
    controller.getReservation)
}
