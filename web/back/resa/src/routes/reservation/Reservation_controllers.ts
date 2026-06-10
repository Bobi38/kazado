import { FastifyReply, FastifyRequest } from 'fastify';
import { ReservationService } from './Reservation_service';

export class ReservationController{
    constructor (private ReservationService: ReservationService) {}
}
