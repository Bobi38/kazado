import { FastifyInstance } from 'fastify';
import * as ReservationSchema from './Reservation_schema';
import { ReservationController } from './Reservation_controllers';
import { ReservationService } from './Reservation_service';

export async function Reservation(fastify: FastifyInstance) {
    const service = new ReservationService();
    const controller = new ReservationController(service);

    fastify.get('/test', {schema: {response: {200: ReservationSchema.test}}, prehandler: ...},
    test.contro)
}
