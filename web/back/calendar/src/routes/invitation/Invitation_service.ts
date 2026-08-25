import  {prisma} from "../../lib/prisma";
import { AppError } from "../preHandler/AppError";


export class InvitationService{

    async getInvitationSend(userId: number){
        console.log("coucou")
        console.log(userId)
        const val : any[] = await prisma.$queryRaw`
        SELECT
            inv.id AS id,
            cal.name AS name_calendar,
            cal.id AS calendarId,
            guest.pseudo AS name_user,
            inv.guestId AS guest
        FROM core_user_invit inv
        INNER JOIN core_calendar cal
            ON inv.calendarId = cal.id
        INNER JOIN core_user guest
            ON inv.guestId = guest.id
        WHERE inv.hostId = ${userId}
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
                console.log(`waitin ${val}`)
                console.log("wowo")
        return {success: true, message: "all invitations as host", data: val}
    }

    async validateInvitation(calendar: string, invitation: string, user:number){
        await prisma.$transaction([
            prisma.core_calendar_user.updateMany({where:{calendarId: calendar, userId: user}, data: {status: true}}),
            prisma.core_user_invit.delete({where:{id: invitation}}),
        ]);
        return {success: true, message: "good user accept in the calendar"}
    }

    async declineInvitation(calendar: string, invitation: string, user:number){
        await prisma.$transaction([
            prisma.core_calendar_user.deleteMany({where:{calendarId: calendar, userId: user}}),
            prisma.core_user_invit.delete({where:{id: invitation}}),
        ]);
            return {success: true, message: "good"}
        }

    async removeInvitation(calendar: string, invitation: string, user:number){
        console.log(calendar, user, invitation)
        await prisma.$transaction([
            prisma.core_calendar_user.deleteMany({where:{calendarId: calendar, userId: user}}),
            prisma.core_user_invit.delete({where:{id: invitation}}),
        ]);
            return {success: true, message: "good"}
        }
}
