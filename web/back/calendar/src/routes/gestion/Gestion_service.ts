import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class GestionService{

    async addValidator(calendar: string, newId: number){
        try{
            await prisma.core_calendar_validator.create({data:{calendarId: calendar, idvalidator: newId}})
            return {success: true, message: "good addValidator"}
        }catch(err){
            return {success: false, message: "back error addValidator " + err}
        }
    }

    async addAdm(calendar: string, newId: number){
        try{
            await prisma.core_calendar_admin.create({data:{calendarId: calendar, idadm: newId}})
            return {success: true, message: "good addValidator"}
        }catch(err){
            return {success: false, message: "back error addValidator " + err}
        }
    }

    async setAdm(calendar: string, userId: number){
        try{
            console.log(calendar)
            const ret = await prisma.core_calendar_admin.findFirst({where:{calendarId: calendar, idadm: userId}})
            const bool = ret ? "yes" : "no";
            return {success: true, message: "good", bool : bool}
        }catch(err){
            return {success: false, message: "wrong allUsers " + err, data: []}
        }
    }
}
