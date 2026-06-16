import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class GestionService{

    async addValidator(calendar: string, newId: number){
        const val = await prisma.core_calendar_validator.findFirst({where:{calendarId: calendar, idvalidator: newId}})
        if (val)
            throw new AppError("validator already exist", 404);
        await prisma.core_calendar_validator.create({data:{calendarId: calendar, idvalidator: newId}})
        return {success: true, message: "good addValidator"}
    }

    async addAdm(calendar: string, newId: number){
        const adm = await prisma.core_calendar_admin.findFirst({where:{calendarId: calendar, idadm: newId}})
        if (adm)
            throw new AppError("admin already exist", 404);
        await prisma.core_calendar_admin.create({data:{calendarId: calendar, idadm: newId}})
        return {success: true, message: "good addAdmin"}
    }

    async addUser(calendar: string, newId: number){
        await prisma.core_calendar_user.create({data:{calendarId: calendar, userId: newId, status: false}})
        return {success: true, message: "good addUser"}
    }

    async setAdm(calendar: string, userId: number){
            console.log(calendar)
            const ret = await prisma.core_calendar_admin.findFirst({where:{calendarId: calendar, idadm: userId}})
            const bool = ret ? "yes" : "no";
            return {success: true, message: "good", bool : bool}
    }
}
