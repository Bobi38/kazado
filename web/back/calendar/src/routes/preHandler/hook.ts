import  {prisma} from "../../lib/prisma";
import { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from "./AppError";

declare module 'fastify' {
  interface FastifyRequest {
    nuser?: number; 
  }
}

export async function checkUser(req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : string}
        const userId = req.user?.id;

        if (!userId || !calId)
            return;
        const isUser = await prisma.core_calendar_user.findUnique({where:{calendarId: calId, userId: userId}})
        if (!isUser)
            throw new AppError(`You are not in this Calendar`, 401)
}

export async function checkNewRole(req: FastifyRequest, rep: FastifyReply) {
        const {name, calendar} = req.query as {name : string, calendar : string}

        if (!name)
            return;
        const isUser = await prisma.core_user.findUnique({where:{pseudo: name}})
        if (!isUser)
            throw new AppError(`The name doesn't exist`, 401)
        const isInCal= await prisma.core_calendare_user.findUnique({where:{calendarId: calendar, userId: isUser.id}});
        if (!isInCal)
            throw new AppError(`The user is not in the calendar`, 401)
        req.nuser = isUser.id;
}

export  async function checkCal(req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : string}

        if (!calId)
            return;
        const isCal = await prisma.core_calendar.findUnique({where:{id: calId}})
        if (!isCal)
            throw new AppError(`Cal doesn't exist`, 401)
    }

export  function checkAdm(ret: string) {
    return async function (req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : string}
        const userId = req.user?.id;

        if (!userId || !calId)
            return;
        const isAdm = await prisma.core_calendar_admin.findUnique({where:{calendarId: calId, idadm: userId}})
        if (!isAdm)
            throw new AppError(`You need to be ADMIN to add ${ret}`, 401)
    }
}