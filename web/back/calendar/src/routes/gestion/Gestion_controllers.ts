import { FastifyReply, FastifyRequest } from 'fastify';
import { GestionService } from './Gestion_service';

export class GestionController{
    constructor (private GestionService: GestionService) {}

    addAdm = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.nuser as number;
            const {calendar} = req.query as {calendar: number};
            const rep = await this.GestionService.addAdm(calendar, userId);
            return reply.send({success: rep.success, message: rep.message})
    }

    addVal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.nuser as number;
            const {calendar} = req.query as {calendar: number};
            const rep = await this.GestionService.addValidator(calendar, userId);
            return reply.send({success: rep.success, message: rep.message})
    }
}
