import { FastifyReply, FastifyRequest } from 'fastify';
import { SecuService } from './Secu_service';

export class SecuController{
    constructor (private SecuService: SecuService) {}

	checko = async (req: FastifyRequest, reply: FastifyReply) => {
		const userId = req.user?.id;
        if (!userId) {
            return reply.status(401).send({ success: false });
        }
		const rep = await this.SecuService.checko(userId);
		return reply.send({success: rep.success, message: rep.message})
	}
}