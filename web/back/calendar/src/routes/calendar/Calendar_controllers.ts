import { FastifyReply, FastifyRequest } from 'fastify';
import { CalendarService } from './Calendar_service';

export class CalendarController{
    constructor (private CalendarService: CalendarService) {}

    myCal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.user;
            console.log(userId)
            const rep = await this.CalendarService.myCal(userId);
            return reply.send({success: rep.success, message: rep.message, data: rep.data})
    }

    addCal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.user;
            const bodyData = req.body as any;
            const rep = await this.CalendarService.addCal(userId, bodyData);
            return reply.send({success: rep.success, message: rep.message, id: rep.id})
    }

    addHome = async (req: FastifyRequest, reply: FastifyReply) => {
            const {calendar} = req.query as {calendar: string};
            const bodyData = req.body as any;
            const rep = await this.CalendarService.addHome(calendar, bodyData);
            if (bodyData.tasksArray.length > 0 && rep.success)
                await this.CalendarService.createToDo(bodyData.tasksArray, rep.HomeId!)
            return reply.send({success: rep.success, message: rep.message})
    }

    updateHome = async (req: FastifyRequest, reply: FastifyReply) => {
            const {homeid} = req.query as {homeid: number};
            const bodyData = req.body as any;
            const rep = await this.CalendarService.updateHome(homeid, bodyData);
            if (bodyData.tasksArray.length > 0 && rep.success)
                await this.CalendarService.updateToDo(bodyData.tasksArray, rep.HomeId!)
            return reply.send({success: rep.success, message: rep.message})
    }

    allHomes = async (req: FastifyRequest, reply: FastifyReply) => {
            const {calendar} = req.query as {calendar: string};
            const rep = await this.CalendarService.allHomes(calendar);
            return reply.send({success: rep.success, message: rep.message, data: rep.data})
    }

    allUsers = async (req: FastifyRequest, reply: FastifyReply) => {
        const {calendar} = req.query as {calendar: string};
        const userId = req.user;
        const rep = await this.CalendarService.allUsers(calendar, userId);
        return reply.send({success: rep.success, message: rep.message, data: rep.data})
    }


}
