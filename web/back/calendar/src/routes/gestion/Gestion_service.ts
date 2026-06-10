import  {prisma} from "../../lib/prisma";


export class GestionService{

    async addValidator(calendar: number, newId: number){
        try{
            await prisma.core_calendar_validator.create({data:{calendarId: calendar, idvalidator: newId}})
            return {success: true, message: "good addValidator"}
        }catch(err){
            return {success: false, message: "back error addValidator " + err}
        }
    }

    async addAdm(calendar: number, newId: number){
        try{
            await prisma.core_calendar_admin.create({data:{calendarId: calendar, idadm: newId}})
            return {success: true, message: "good addValidator"}
        }catch(err){
            return {success: false, message: "back error addValidator " + err}
        }
    }
}
