import  {prisma} from "../../lib/prisma";


export class ReservationService{
    async addReservation(data: any, calendar: string, id: number){
        try {
            const reservation = await prisma.core_reservation.create({
                data: {
                    ...data,
                    calendarId: calendar,
                    userId: id
                }
            });
            return { success: true, message: "Reservation created", id: reservation.id };
        } catch (error) {
            console.error("Error creating reservation:", error);
            return { success: false, message: "Error creating reservation" };
        }
    }
}
