import { FastifyReply, FastifyRequest } from 'fastify';
import { ReservationService } from './Reservation_service';

export class ReservationController{
    constructor (private ReservationService: ReservationService) {}

    addReservation = async (req: FastifyRequest, reply: FastifyReply) => {
        const bodyData = req.body as any;
        const id = req.user;
        const {calendar} = req.query as {calendar: string};
        const ret = await this.ReservationService.addReservation(bodyData, calendar, id!);
        reply.status(200).send({success: ret.success, message: ret.message });
    }

    getReservation = async (req: FastifyRequest, reply: FastifyReply) => {
        const {calendar, start, end} = req.query as {calendar: string, start: string, end:string};
        const ret = await this.ReservationService.getReservation(calendar, end, start);
        reply.status(200).send({success: ret.success, message: ret.message, data: ret.data });
    }

    getReservationId = async (req: FastifyRequest, reply: FastifyReply) => {
        const {calendar} = req.query as {calendar: string};
        const id = req.user;
        const ret = await this.ReservationService.getReservationid(calendar, id);
        console.log(JSON.stringify(ret))
        reply.status(200).send({success: ret.success, message: ret.message, data: ret.data });
    }

    getValidation = async (req: FastifyRequest, reply: FastifyReply) => {
        const {calendar} = req.query as {calendar: string};
        const id = req.user;
        const ret = await this.ReservationService.getValidation(calendar, id);
        console.log(JSON.stringify(ret))
        reply.status(200).send({success: ret.success, message: ret.message, data: ret.data });
    }
}
