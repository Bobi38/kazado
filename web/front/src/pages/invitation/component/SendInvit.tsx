import { useEffect, useRef, useState }            from    "react";
import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function SendInvit(){

    const [sendingInvitations, setSendingInvitations] = useState([]);

    const get_my_invitation = async () => {
        try{
            const url =`/api/invitation/send`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                if (ret.success)
                    setSendingInvitations(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    const handleDelete = async (invitationId: string, calendarId: string, guest: number) => {
        try {
            console.log(guest)

            console.log(invitationId)
            const url = `/api/invitation/remove/${encodeURIComponent(invitationId)}`

            const rep = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({calendar: calendarId, guestId: guest})
            })

            const ret = await rep.json()
            console.log(ret)
            if (ret.success)
                get_my_invitation();
            else
                console.log(`front cal_submit success false: ${ret.message}`)
        } catch (err) {
            console.log(`cal_submit error TRY ${err}`)
        }
    }

    useEffect(() => {
        get_my_invitation();
    }, []);


    return (
            <Box sx={{my:2}}>
                {sendingInvitations.length > 0 ? (
                    <Box>
                    {sendingInvitations.map(invitation => (
                        <Stack key={invitation.id} direction="row" spacing={2}>
                            <Typography>{invitation.name_user}</Typography>
                            <Typography>{invitation.name_calendar}</Typography>
                            <Button type="button" onClick={() => handleDelete(invitation.id, invitation.calendarId, invitation.guest)}><CancelIcon/></Button>
                        </Stack>
                    ))}
                    </Box>
                ):(
                    <Typography>Aucune invitation envoyé</Typography>
                )}
            </Box>

    )
}