import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class ReservationService{
    async addReservation(data: any, calendar: string, id: number){
            const bool = await prisma.core_calendar.findFirst({where:{id: calendar}, select:{validator:true}})
            const vali = await prisma.core_calendar_validator.findFirst({where:{calendarId: calendar, idvalidator: id}})
            let validator: boolean = false;
            if (vali)
                validator = false;
            else
                validator = !bool?.validator
            const start = new Date(data.date_start + "T00:00:00.000Z")
            const end = new Date(data.date_end + "T00:00:00.000Z")
            const result = await prisma.$transaction(async (tx: any) => {
            const reservation = await tx.core_reservation.create({
                data: {
                    name: data.name,
                    nb_adult: data.nb_adult,
                    nb_children: data.nb_children,
                    date_start: start,
                    date_end: end,
                    calendarId: calendar,
                    userId: id,
                    status: validator
                }
            });
            for(const i of data.invit ?? [])
                await tx.core_reservation_user.create({data:{resaId: reservation.id, userId:i}})
            for(const h of data.Home ?? [])
                await tx.core_reservation_home.create({data:{resaId: reservation.id, homeId: h}})
            return reservation
        })
            return { success: true, message: "Reservation created", id: result.id };
    }

    async getReservation(calendar: string, endOfMonth: string, startOfMonth: string){
            console.log (startOfMonth + endOfMonth)
            const start = new Date(startOfMonth )
            const end = new Date(endOfMonth)
            const resa = await prisma.core_reservation.findMany({where: {calendarId: calendar,
                                                                date_start: {lte: end},
                                                                date_end: {gte: start}
                                                              }})
            return { success: true, message: "all resa good", data: resa };
    }

    async getReservationid(calendar: string, id: number){
        const now = new Date()
        let oneCalendar ="";
        if (calendar != "null"){
            oneCalendar = `AND resa.calendarId = ${calendar}`
        }
        console.log("coucou" + id + " " + now)
        const data = await prisma.core_reservation.findMany({
            where: {
                allUser:{some:{userId : id}},
                date_end: { gte: now },
                calendarId: calendar !== "null" ? calendar : undefined
            },
            select:{
                id: true,
                name: true,
                date_start: true,
                date_end: true,
                status: true,
                id_calendar: { select: { id: true, name: true } },
                allHome: { select: { id_home: { select: { id: true, name: true } } } }
            },
        })
        console.log(data)
        const dataparse = data.map(reservation => ({
            name: reservation.name,
            start: reservation.date_start,
            end: reservation.date_end,
            status: reservation.status === true ? "validé":"en attente",
            name_cal: reservation.id_calendar.name,
            calId: reservation.id_calendar.id,
            homes: reservation.allHome.map(h => h.id_home.name ).join(", ")
        }));
        console.log("au revoir");
        console.log(dataparse)
        return { success: true, message: "all resa good", data: dataparse };
    }

    async getValidation(calendar: string, id: number){
        const now = new Date()
        console.log("coucou" + id + " " + now)
        const admid = await prisma.core_calendar_validator.findMany({
            where:{idvalidator: id},
            select:{calendarId: true}
        })
        const calendarIds = admid.map(item => item.calendarId);
        const data = await prisma.core_reservation.findMany({
            where: {
                date_end: { gte: now },
                calendarId: {in : calendarIds},
                status: false
            },
            select:{
                id: true,
                name: true,
                date_start: true,
                date_end: true,
                nb_adult: true,
                nb_children: true,
                id_calendar: { select: { id: true, name: true } },
                allHome: { select: { id_home: { select: { id: true, name: true }}}},
                allUser: {select: {id_user: {select: {id:true, name: true}}}},
            },
        })
        console.log(data)
        const dataparse = data.map(reservation => ({
            name: reservation.name,
            id_resa: reservation.id,
            start: reservation.date_start,
            end: reservation.date_end,
            name_cal: reservation.id_calendar.name,
            nb_adult: reservation.nb_adult,
            nb_children: reservation.nb_children,
            user: reservation.allUser.map(u => u.id_user.name).join(", "),
            homes: reservation.allHome.map(h => h.id_home.name ).join(", ")
        }));
        console.log("au revoir");
        console.log(dataparse)
        return { success: true, message: "all resa good", data: dataparse };
    }
}
