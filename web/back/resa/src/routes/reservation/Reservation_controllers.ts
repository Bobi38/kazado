import { FastifyReply, FastifyRequest } from 'fastify';
import { ReservationService } from './Reservation_service';

export class ReservationController{
    constructor (private ReservationService: ReservationService) {}

    addReservation = async (req: FastifyRequest, reply: FastifyReply) => {
        const bodyData = req.body as any;
        const {calendar} = req.query as {calendar: string};
        const ret = await this.ReservationService.addReservation(bodyData, calendar);
        reply.status(200).send({success: ret.success, message: ret.message });
}
