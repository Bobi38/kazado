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
}
