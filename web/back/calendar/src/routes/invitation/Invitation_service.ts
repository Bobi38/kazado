import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class InvitationService{

    async getInvitation(userId: number){
        const val : any[] = await prisma.$queryRaw`
        SELECT
            inv.id as id,
            cal.name as name_calendar,
            cal.id as calendarId,
            host.pseudo as name_user
        FROM core_user u
        INNER JOIN core_user_invit inv ON u.id = inv.guestId
        INNER JOIN core_calendar cal ON inv.calendarId = cal.id
        INNER JOIN core_user host ON inv.hostId = host.id
        WHERE inv.guestId = ${userId}
        `;
        return {success: true, message: "all invitations as Guest", data: val}
    }

    async getInvitationWaiting(userId: number){
        const val : any[] = await prisma.$queryRaw`
        SELECT
            inv.id as id,
            cal.name as name_calendar,
            cal.id as calendarId,
            guest.pseudo as name_user
        FROM core_user u
        INNER JOIN core_user_invit inv ON u.id = inv.hostId
        INNER JOIN core_calendar cal ON inv.calendarId = cal.id
        INNER JOIN core_user guest ON inv.guestId = guest.id
        WHERE inv.guestId = ${userId}
        `;
        return {success: true, message: "all invitations as host", data: val}
    }

    async validateInvitation(calendar: string, invitation: string, user:number){
        console.log(`validateInvitation calendar: ${calendar}, invitation: ${invitation}, user: ${user}`)
        await prisma.$transaction([
            prisma.core_calendar_user.updateMany({where:{calendarId: calendar, userId: user}, data: {status: true}}),
            prisma.core_user_invit.delete({where:{id: invitation}}),
        ]);
        return {success: true, message: "good user accept in the calendar"}
    }

    async removeInvitation(calendar: string, userId: number, status: string){
        if (status === "host") {

            console.log(calendar)
            const ret = await prisma.core_calendar_admin.findFirst({where:{calendarId: calendar, idadm: userId}})
            const bool = ret ? "yes" : "no";
            return {success: true, message: "good"}
        }
    }
}
