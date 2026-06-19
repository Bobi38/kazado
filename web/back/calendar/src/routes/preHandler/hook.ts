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
        const userId = req.user;

        if (!userId || !calId)
            throw new AppError(`Miss argument prehandler checkuser`, 404)
        const isUser = await prisma.core_calendar_user.findFirst({where:{calendarId: calId, userId: userId}})
        if (!isUser)
            throw new AppError(`You are not in this Calendar`, 401)
}

export async function checkNewRole(req: FastifyRequest, rep: FastifyReply) {
        const {name, calendar} = req.query as {name : string, calendar : string}

        if (!name)
            return;
        const isUser = await prisma.core_user.findFirst({where:{pseudo: name}})
        if (!isUser)
            throw new AppError(`The name doesn't exist`, 401)
        const isInCal= await prisma.core_calendar_user.findFirst({where:{calendarId: calendar, userId: isUser.id}});
        if (!isInCal)
            throw new AppError(`The user is not in the calendar`, 401)
        req.nuser = isUser.id;
}

export async function checkNewUser(req: FastifyRequest, rep: FastifyReply) {
        const {name, calendar} = req.query as {name : string, calendar : string}

        if (!name)
            return;
        const isUser = await prisma.core_user.findFirst({where:{pseudo: name}})
        if (!isUser)
            throw new AppError(`Le user ${name} n'existe pas `, 401)
        const isInCal= await prisma.core_calendar_user.findFirst({where:{calendarId: calendar, userId: isUser.id}});
        if (isInCal){
            if (isInCal.status === false)
                throw new AppError(`Le user ${name} a déjà une invitation en attente`, 401)
            else            
                throw new AppError(`Le user ${name} est déjà dans le calendar`, 401)
        }
        req.nuser = isUser.id;
}

export  async function checkCal(req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : string}

        if (!calId)
            throw new AppError(`Need cal Id`, 404)
        const isCal = await prisma.core_calendar.findUnique({where:{id: calId}})
        if (!isCal)
            throw new AppError(`Cal doesn't exist`, 404)
    }

export  async function checkHome(req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : string}
        const {id}= req.params as { id: string };
        const home = parseInt(id,10)

        if (!calId || !home)
            throw new AppError(`Need cal and home id`, 404)
        const isHome = await prisma.core_relation_CalendarHome.findFirst({where:{calendarId: calId, homeId: home}})
        if (!isHome)
            throw new AppError(`home doesn't exist`, 404)

    }

export  function checkAdm(ret: string) {
    return async function (req: FastifyRequest, rep: FastifyReply) {
        const {calendar: calId} = req.query as {calendar : string}
        const userId = req.user;

        if (!userId || !calId)
            throw new AppError(`Miss argument prehandler checkAdm`, 404)
        const isAdm = await prisma.core_calendar_admin.findFirst({where:{calendarId: calId, idadm: userId}})
        if (!isAdm)
            throw new AppError(`You need to be ADMIN to add ${ret}`, 401)
    }
}