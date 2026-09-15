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

    logout = async(req: FastifyRequest, rep: FastifyReply) => {
        console.log("logout")
        rep.clearCookie('auth_kaza');
        return rep.send({success: true, message: "user logout sucess"})
    }

    passwordForget = async(req: FastifyRequest, rep: FastifyReply) => {
        const bodyData = req.body as any;
        const reponse = await this.UserService.passwordForget(bodyData, rep);
        console.log("reponse", reponse)
        const send = await this.UserService.sendMail(bodyData.email, reponse.token)
        return rep.send({success: send.success, message: send.message}) 
    }

    passwordReset = async(req: FastifyRequest, rep: FastifyReply) => {
        const bodyData = req.body as any;
        const reponse = await this.UserService.passwordReset(bodyData, rep);
        return rep.send({success: reponse.success, message: reponse.message, }) 
    }
}
