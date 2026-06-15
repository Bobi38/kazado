import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class ReservationService{
    async addReservation(data: any, calendar: string, id: number){
            const bool = await prisma.core_calendar.findFirst({where:{id: calendar}, select:{validator:true}})
            const validator = !bool?.validator
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
        const today = new Date()
        const now = today.toISOString().slice(0, 19).replace('T', ' ');
        let oneCalendar ="";
        if (calendar != "null"){
            oneCalendar = `AND resa.calendarId = ${calendar}`
        }
        console.log("coucou" + id + " " + now)
        const data: any[] = await prisma.$queryRawUnsafe(`
            SELECT
                resa.name as name,
                resa.date_start as start,
                resa.date_end as end,
                resa.status as status,
                cal.name as name_cal,
                cal.id as calId,
                GROUP_CONCAT(h.name SEPARATOR ', ') as homes
                FROM core_reservation_user core
                INNER JOIN core_reservation resa ON core.resaId = resa.id
                INNER JOIN core_calendar cal ON resa.calendarId = cal.id
                INNER JOIN core_reservation_home rh ON resa.id = rh.resaId
                INNER JOIN core_home h ON rh.homeId = h.id
                WHERE core.userId = ${id}
                    AND resa.date_end >= '${now}'
                    ${oneCalendar}
                ORDER BY start ASC
                `)
        console.log(data)
const formattedData = data.map(resa => ({
            ...resa,
            homes: resa.homes ? resa.homes.split(', ') : []
        }));

    
        console.log("coucou");
        if (formattedData.length > 0) {
            console.log("Nom de la première résa :", formattedData[0].name);
        } else {
            console.log("Aucune réservation trouvée.");
        }
        console.log("au revoir");
        return { success: true, message: "all resa good", data: data };
    }
}
