import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './User_service';

export class UserController{
    constructor (private UserService: UserService) {}

    post = async(req: FastifyRequest, rep: FastifyReply) => {
        const bodyData = req.body as any;
        const reponse = await this.UserService.postRegister(bodyData);
        return rep.send({success: reponse.success, message: reponse.message}) 
    }

    login = async(req: FastifyRequest, rep: FastifyReply) => {
        const bodyData = req.body as any;
        const reponse = await this.UserService.login(bodyData, rep);
        return rep.send({success: reponse.success, message: reponse.message}) 
    }
}
