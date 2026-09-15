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

        console.log("in check user")
        if (!userId || !calId)
            throw new AppError(`Miss argument prehandler checkuser`, 404)
        const isUser = await prisma.core_calendar_user.findFirst({where:{calendarId: calId, userId: userId}})
        if (!isUser)
            throw new AppError(`You are not in this Calendar`, 401)
}

export async function checkRegister(req: FastifyRequest, rep: FastifyReply) {
        const {email, username} = req.body as {email : string, username : string}
        
        if (!email || !username)
            throw new AppError(`Miss argument prehandler checkRegister`, 404)
        const isEmail = await prisma.core_user.findFirst({where:{email: email}})
        if (isEmail)
            throw new AppError(`L'email est déjà utilisé`, 401)
        const isUsername = await prisma.core_user.findFirst({where:{pseudo: username}})
        if (isUsername)
            throw new AppError(`Le nom d'utilisateur est déjà utilisé`, 401)
}


export async function checkMail(req: FastifyRequest, rep: FastifyReply) {
        const {email} = req.body as {email : string}
        
        if (!email)
            throw new AppError(`Miss argument prehandler checkLogin`, 404)
        const isEmail = await prisma.core_user.findFirst({where:{email: email}})
        if (!isEmail)
            throw new AppError(`L'email n'existe pas`, 401)
}




export async function checkName(req: FastifyRequest, rep: FastifyReply) {
        const {name, calendar} = req.query as {name : string, calendar : string}

        if (!name)
            return;
        const isUser = await prisma.core_user.findFirst({where:{pseudo: name}})
        if (!isUser)
            throw new AppError(`Le user ${name} n'existe pas `, 401)
        const isInCal= await prisma.core_calendar_user.findFirst({where:{calendarId: calendar, userId: isUser.id}});
        if (!isInCal){
            throw new AppError(`Le user ${name} n'est pas dans le calendar`, 401)
        }
        req.nuser = isUser.id;
}
