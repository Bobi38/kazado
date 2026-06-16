import prisma from "./lib/prisma"

export default async function init_db(){
    const templates = [
        {
          key: 'NEW_RESERVATION_PENDING',
          title: '📌 Nouvelle demande de réservation sur {calendarName} !',
          message: '{guestName} a soumis une demande pour le créneau du {date}.',
        },
        {
          key: 'NEW_RESERVATION_WAITING',
          title: '📌 Nouvelle demande en attente de validation sur {calendarName} !',
          message: '{guestName} a soumis une demande pour le créneau du {date}.\nEn attente de validation dans l\'onglet "Réservation", rubrique "réservations en attentes de validations"',
        },
        {
          key: 'MY_RESA_VALIDATED',
          title: '✅ Réservation confirmée sur {calendarName}!',
          message: 'Votre réservation pour le calendrier {calendarName} a été validée par un validator.',
        },
        {
          key: 'RESA_VALIDATED',
          title: '✅ Réservation confirmée sur {calendarName}!',
          message: 'La réservation de {guestName} pour le calendrier {calendarName} du {date} a été validée par un validator.',
        },
        {
          key: 'RESA_REFUSED',
          title: '❌ Réservation refusée',
          message: 'Votre demande de réservation a été refusée. Motif : {reason}',
        },
    ];

    for(const temp of templates){
        await prisma.core_notification_template({data:{
                                                        key: temp.key,
                                                        title: temp.title,
                                                        message: temp.message
        }})
    }

    console.log('✅ template add avec succès !')
}