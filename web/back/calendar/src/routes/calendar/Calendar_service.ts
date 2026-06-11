import { validateHeaderName } from "node:http";
import  {prisma} from "../../lib/prisma";


export class CalendarService{
    async myCal(id: number){
        try{
            const userId = id;
            console.log(` coucou je sui le suer ${userId}`)
            const data: any[] = await prisma.$queryRaw`
                SELECT
                    lien.calendarId as id,
                    cal.name as name
                FROM core_calendar_user lien
                INNER JOIN core_calendar cal ON lien.calendarId = cal.id
                WHERE lien.userId = ${userId}
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
            const ex = await prisma.core_calendar.findFirst({where:{name: data.name}})
            if (ex)
                return {success: false, message: "calendar name already exist"}
            const idCal = await prisma.core_calendar.create({data:{name: data.name, nb_home: 0, validator: data.validator}})
            await prisma.core_calendar_user.create({data:{calendarId: idCal.id, userId: uId, status: true}})
            await prisma.core_calendar_admin.create({data:{calendarId: idCal.id, idadm: uId}})
            return {success: true, message: "good", id: idCal.id}
        }catch(err){
            return {success: false, message: "wrong addcall" + err}
        }
    }

    async addHome(calendar: string, data: any){
        try{
            const calId = calendar;
            const res = await prisma.core_home.findFirst({where:{calendarId: calId, name: data.name}})
            if (res)
                return {success: false, message: "home name already use in this calendar"}
            const homeId = await prisma.core_home.create({data:{nb_people: data.nb_people,
                                                                 nb_bedroom: data.nb_bedroom,
                                                                 adress: data.adress,
                                                                 name: data.name,
                                                                 calendarId: calId   
                                                                }})
            await prisma.core_relation_CalendarHome.create({data:{homeId: homeId.id, calendarId: calId}})
            await prisma.core_calendar.update({where:{id: calId}, data:{nb_home:{increment: 1}}})
            return {success: true, message: "good addHome", HomeId: homeId.id}
        }catch(err){
            return {success: false, message: "back error addHome " + err, HomeId : -1}
        }
    }

    async createToDo(tasksArray: string[], homeId: number){
        try{
            const dataToInsert = tasksArray.map(taskName => ({
                homeId: homeId,
                task: taskName,
                status: false
            }));
            await prisma.core_home.update({where:{id: homeId}, data:{isToDo: true}})
            await prisma.core_todo.createMany({
                data: dataToInsert,
                skipDuplicates: true 
            });
            return {success: true, message: "todo add with success"}
        }catch(err){
            return {success: false, message: `error back createtodo ${err}`}
        }
    }

    async allHomes(calendar: string){
        try{
            const homes: any[] = await prisma.$queryRaw`
                SELECT
                    home.id as id,
                    home.name as name
                FROM core_home home
                INNER JOIN core_relation_CalendarHome rel ON home.id = rel.homeId
                WHERE rel.calendarId = ${calendar}
            `;
            return {success: true, message: "good", data: homes}
        }catch(err){
            return {success: false, message: "wrong allHomes " + err, data: []}
        }
    }

    async allUsers(calendar: string, userId: number){
        try{
            console.log(calendar)
            const Users: any[] = await prisma.$queryRaw`
                SELECT
                    user.id as id,
                    user.name as name
                FROM core_user user
                INNER JOIN core_calendar_user rel ON user.id = rel.userId
                WHERE rel.calendarId = ${calendar}
                AND rel.userId != ${userId}
            `;
            return {success: true, message: "good", data: Users}
        }catch(err){
            return {success: false, message: "wrong allUsers " + err, data: []}
        }
    }

}