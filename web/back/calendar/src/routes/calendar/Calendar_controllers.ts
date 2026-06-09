import { FastifyReply, FastifyRequest } from 'fastify';
import { CalendarService } from './Calendar_service';

export class CalendarController{
    constructor (private CalendarService: CalendarService) {}

    myCal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.user?.id;
            const rep = await this.CalendarService.myCal(userId);
            return reply.send({success: rep.success, message: rep.message, data: rep.data})
    }

    addCal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.user?.id;
            const bodyData = req.body as any;
            const rep = await this.CalendarService.addCal(userId, bodyData);
            return reply.send({success: rep.success, message: rep.message})
    }

    addHome = async (req: FastifyRequest, reply: FastifyReply) => {
            const {calendar} = req.query as {calendar: number};
            const bodyData = req.body as any;
            const rep = await this.CalendarService.addHome(calendar, bodyData);
            return reply.send({success: rep.success, message: rep.message})
    }

    addAdm = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.nuser as number;
            const {calendar} = req.query as {calendar: number};
            const rep = await this.CalendarService.addAdm(calendar, userId);
            return reply.send({success: rep.success, message: rep.message})
    }

    addVal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.nuser as number;
            const {calendar} = req.query as {calendar: number};
            const rep = await this.CalendarService.addValidator(calendar, userId);
            return reply.send({success: rep.success, message: rep.message})
    }
}
