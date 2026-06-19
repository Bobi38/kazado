import { validateHeaderName } from "node:http";
import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class CalendarService{
    async myCal(id: number){
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
    }

    async addCal(id: number, data: any){
            const uId = id
            const ex = await prisma.core_calendar.findFirst({where:{name: data.name}})
            if (ex)
                throw new AppError("calendar name already exist", 404);
            const idCal = await prisma.core_calendar.create({data:{name: data.name, nb_home: 0, validator: data.validator}})
            await prisma.core_calendar_user.create({data:{calendarId: idCal.id, userId: uId, status: true}})
            await prisma.core_calendar_admin.create({data:{calendarId: idCal.id, idadm: uId}})
            return {success: true, message: "good", id: idCal.id}
    }

    async addHome(calendar: string, data: any){
            const calId = calendar;
            const res = await prisma.core_home.findFirst({where:{calendarId: calId, name: data.name}})
            if (res)
                throw new AppError("home name already use in this calendar", 404);
            const homeId = await prisma.core_home.create({data:{nb_people: data.nb_people,
                                                                 nb_bedroom: data.nb_bedroom,
                                                                 adress: data.adress,
                                                                 name: data.name,
                                                                 calendarId: calId   
                                                                }})
            await prisma.core_relation_CalendarHome.create({data:{homeId: homeId.id, calendarId: calId}})
            await prisma.core_calendar.update({where:{id: calId}, data:{nb_home:{increment: 1}}})
            return {success: true, message: "good addHome", HomeId: homeId.id}
    }

    async updateHome(homeId: number, data: any){
            const res = await prisma.core_home.findFirst({where:{id: {not : homeId}, name: data.name}})
            if (res)
                throw new AppError("home name already use in this calendar", 404);
            await prisma.core_home.update({where : {id: homeId}, data:{nb_people: data.nb_people,
                                                                 nb_bedroom: data.nb_bedroom,
                                                                 adress: data.adress,
                                                                 name: data.name,
                                                                }})
            return {success: true, message: "good addHome"}
    }

    async createToDo(tasksArray: string[], homeId: number){
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
    }

    async updateToDo(tasksArray: string[], homeId: number){
        console.log("i m in updatetodo")
            const dataToInsert = tasksArray.map(taskName => ({
                homeId: homeId,
                task: taskName,
                status: false
            }));
            await prisma.$transaction([
                    prisma.core_todo.deleteMany({
                        where: { homeId: homeId }
                    }),
                    prisma.core_home.update({
                        where: { id: homeId },
                        data: { isToDo: true }
                    }),
                    prisma.core_todo.createMany({
                        data: dataToInsert,
                        skipDuplicates: true
                    })
                ]);
            return {success: true, message: "todo add with success"}
    }

    async allHomes(calendar: string){
            const homes: any[] = await prisma.$queryRaw`
                SELECT
                    home.id as id,
                    home.name as name
                FROM core_home home
                INNER JOIN core_relation_CalendarHome rel ON home.id = rel.homeId
                WHERE rel.calendarId = ${calendar}
            `;
            return {success: true, message: "good", data: homes}
    }

    async allUsers(calendar: string, userId: number){
            const Users: any[] = await prisma.$queryRaw`
                SELECT
                    user.id as id,
                    user.pseudo as name
                FROM core_user user
                INNER JOIN core_calendar_user rel ON user.id = rel.userId
                WHERE rel.calendarId = ${calendar}
                AND rel.userId != ${userId}
                `;
                console.log(Users)
            return {success: true, message: "good", data: Users}
    }

    async infoHome(id: number){
        const home = await prisma.core_home.findUnique({
            where: { id: id },
            select: {
                nb_people: true,
                nb_bedroom: true,
                adress: true,
                name: true,
                toDoTasks: {
                    select: {
                        task: true
                    }
                }
            }
        });
        if (!home) 
            throw new AppError("Home not found", 404);

        const formattedData = {
            nb_people: home.nb_people,
            nb_bedroom: home.nb_bedroom,
            adress: home.adress,
            name: home.name,
            tasksArray: home.toDoTasks.map(t => t.task).join(", ")
        };
        console.log(formattedData)
        return {success: true, message: "good recup data home", data : formattedData}
    }

}