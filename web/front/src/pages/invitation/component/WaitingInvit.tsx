import { useEffect, useRef, useState }            from    "react";
import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function WaitingInvit(){

        const [pendingInvitations, setPendingInvitations] = useState([]);

        const get_my_invitation = async () => {
        try{
            const url =`/api/invitation/waiting`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                if (ret.success)
                    setPendingInvitations(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    const handleAccept = async (invitationId: string, calendarId: string) => {
        try {
            const url = `/api/invitation/${encodeURIComponent(invitationId)}`

            const rep = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({calendar: calendarId })
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

    const handleDelete = async (invitationId: string, calendarId: string) => {
        try {
            const url = `/api/invitation/${encodeURIComponent(invitationId)}`

            const rep = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({calendar: calendarId })
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
                {pendingInvitations.length > 0 ? (
                    <Box>
                    {pendingInvitations.map(invitation => (
                        <Stack key={invitation.id} direction="row" spacing={2}>
                            <Typography>{invitation.name_user}</Typography>
                            <Typography>{invitation.name_calendar}</Typography>
                            <Button type="button" onClick={() => handleAccept(invitation.id, invitation.calendarId)}><CheckCircleIcon/></Button>
                            <Button type="button" onClick={() => handleDelete(invitation.id, invitation.calendarId)}><CancelIcon/></Button>
                        </Stack>
                    ))}
                    </Box>
                ):(
                    <Typography>Aucune invitation reçu</Typography>
                )}
            </Box>

    )
}