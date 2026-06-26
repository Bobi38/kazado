import { FastifyReply, FastifyRequest } from 'fastify';
import { InvitationService } from './Invitation_service';

export class InvitationController {
    constructor(private InvitationService: InvitationService) { }

    getInvitation = async (req: FastifyRequest, reply: FastifyReply) => {
        console.log("getInvitation")
        const userId = req.user as number;
        const rep = await this.InvitationService.getInvitation(userId);
        return reply.send({ success: rep.success, message: rep.message, data: rep.data })
    }

    getInvitationWaiting = async (req: FastifyRequest, reply: FastifyReply) => {
        const userId = req.user as number;
        const rep = await this.InvitationService.getInvitationWaiting(userId);
        return reply.send({ success: rep.success, message: rep.message, data: rep.data })
    }

    validate = async (req: FastifyRequest, reply: FastifyReply) => {
        const user = req.user as number
        const { id } = req.params as { id: string };
        const { calendar } = req.body as { calendar: string };
        const rep = await this.InvitationService.validateInvitation(calendar, id, user);
        return reply.send({ success: rep.success, message: rep.message })
    }

    remove = async (req: FastifyRequest, reply: FastifyReply) => {
        const user = req.user as number
        const { id } = req.query as { id: string };
        const rep = await this.InvitationService.removeInvitation(id, user);
        return reply.send({ success: rep.success, message: rep.message})
    }

}
