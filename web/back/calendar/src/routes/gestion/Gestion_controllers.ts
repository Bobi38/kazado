import { FastifyReply, FastifyRequest } from 'fastify';
import { GestionService } from './Gestion_service';

export class GestionController{
    constructor (private GestionService: GestionService) {}

    addAdm = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.nuser as number;
            const {calendar} = req.query as {calendar: string};
            const rep = await this.GestionService.addAdm(calendar, userId);
            return reply.send({success: rep.success, message: rep.message})
    }

    addVal = async (req: FastifyRequest, reply: FastifyReply) => {
            const userId = req.nuser as number;
            const {calendar} = req.query as {calendar: string};
            const rep = await this.GestionService.addValidator(calendar, userId);
            return reply.send({success: rep.success, message: rep.message})
    }

    setAdm = async (req: FastifyRequest, reply: FastifyReply) => {
        const {calendar} = req.query as {calendar: string};
        const userId = req.user;
        const rep = await this.GestionService.setAdm(calendar, userId);
        return reply.send({success: rep.success, message: rep.message, bool: rep.bool})
    }

}
