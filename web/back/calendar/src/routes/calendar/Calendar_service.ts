import { validateHeaderName } from "node:http";
import  {prisma} from "../../lib/prisma";


export class CalendarService{
    async myCal(id: number){
        try{
            const userId = id;
            const data: any[] = await prisma.$queryRaw`
                SELECT
                    lien.calendarId as id,
                    cal.name as name
                FROM core_calendar_user lien
                INNER JOIN core_calendar cal ON lien.calendarId = cal.id
                WHERE lien.userId = '${userId}'
                    AND lien.status = true
            `;
            return {success: true, message: "good", data: data}
        }catch(err){
            return {success: false, message: "wrong mycal " + err, data: []}
        }
    }

    async addCal(id: number, data: any){
        try{
            const uId = id
            const ex = await prisma.core_calendar.findUnique({where:{name: data.name}})
            if (ex)
                return {success: false, message: "calendar name already exist"}
            const idCal = await prisma.core_calendar.create({data:{name: data.name, nb_home: 0, validator: data.validator}})
            await prisma.core_calendar_user.create({calendarId: idCal.id, userId: uId, status: true})
            await prisma.core_calendar_admin.create({calendarId: idCal.id, idadm: uId})
            return {success: true, message: "good"}
        }catch(err){
            return {success: false, message: "wrong addcall" + err}
        }
    }

    async addHome(calendar: number, data: any){
        try{
            const calId = calendar;
            const res = await prisma.core_home.findUnique({where:{calendarId: calId, name: data.name}})
            if (res)
                return {success: false, message: "home name already use in this calendar"}
            const homeId = await prisma.core_home.create({data:{nb_people: data.nb_people,
                                                                 nb_bedroom: data.nb_bedroom,
                                                                 adress: data.adress,
                                                                 name: data.name,
                                                                 calendarId: calId   
                                                                }})
            await prisma.core_relation_CalendarHome.create({homeId: homeId.id, calendarId: calId})
            return {success: true, message: "good addHome"}
        }catch(err){
            return {success: false, message: "back error addHome " + err}
        }
    }

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