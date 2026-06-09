import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as SecuSchema from './Secu_schema';
import { SecuController } from './Secu_controller';
import { SecuService } from './Secu_service';
import jwt from "jsonwebtoken"
import {secret} from "../index.ts"


async function checkAuthToken(req: FastifyRequest, rep: FastifyReply) {
    const token = req.cookies.auth;
    console.log("coucou")
    console.log(secret)
    console.log(token)
    if (!token) {
        return rep.send({success:false, message:`Token doesn't exist`})
    }
    try{
        const decoded = jwt.verify(token, secret) as { id: number };
        req.user = decoded;
    }catch(err){
        return rep.send({success:false, message:'Token invalide'})
    }
}


export async function Secu(fastify: FastifyInstance) {

    const service = new SecuService()
    const controller = new SecuController(service);

    fastify.get('/checkco', {schema : {response : {200: SecuSchema.SecuReturnBool}}, preHandler: checkAuthToken},
        controller.checko);
}