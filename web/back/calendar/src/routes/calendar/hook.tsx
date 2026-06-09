import  {prisma} from "../../lib/prisma";
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    nuser?: number; 
  }
}

export async function checkUser(req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : number}
        const userId = req.user?.id;

        if (!userId || !calId)
            return;
        const isUser = await prisma.core_calendar_user.findUnique({where:{calendarId: calId, userId: userId}})
        if (!isUser)
            return rep.status(401).send({success: false, message: `You are not in this Calendar`})   
}

export async function checkNewRole(req: FastifyRequest, rep: FastifyReply) {
        const {name, calendar} = req.query as {name : string, calendar: number}

        if (!name)
            return;
        const isUser = await prisma.core_user.findUnique({where:{pseudo: name}})
        if (!isUser)
            return rep.status(401).send({success: false, message: `The name doesn't exist`})
        const isInCal= await prisma.core_calendare_user.findUnique({where:{calendarId: calendar, userId: isUser.id}});
        if (!isInCal)
            return rep.status(401).send({success: false, message: `The user is not in the calendar`})
        req.nuser = isUser.id;
}

export  async function checkCal(req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : number}

        if (!calId)
            return;
        const isCal = await prisma.core_calendar.findUnique({where:{id: calId}})
        if (!isCal)
            return rep.status(401).send({success: false, message: `Cal doesn't exist`})   
    }

export  function checkAdm(ret: string) {
    return async function (req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : number}
        const userId = req.user?.id;

        if (!userId || !calId)
            return;
        const isAdm = await prisma.core_calendar_admin.findUnique({where:{calendarId: calId, idadm: userId}})
        if (!isAdm)
            return rep.status(401).send({success: false, message: `You need to be ADMIN to add ${ret}`})   
    }
}