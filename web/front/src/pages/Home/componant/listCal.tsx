import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState, Dispatch, SetStateAction }            from    "react";
import { Link } from 'react-router-dom'
import {Container, Paper, Box, Stack, TextField, Typography, Button, Divider} from "@mui/material"

type ListCalProps = {
  setFormCal: Dispatch<SetStateAction<boolean>>;
  formCal: boolean;
};

export default function ListCal({setFormCal, formCal}: ListCalProps){

    const [cal, setCal] = useState([])

    const cal_submit = async () =>{
        try{
            const url = `/api/calendar/getMy`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                setCal(ret.data)
            else 
                console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    useEffect(() => {
        const co = async () => {
            if (formCal === false)
                await cal_submit();
        }
        co();
    }, [])

    return (
        <>
            <Typography variant="h4" sx={{color:"#7C9D96"}} align="left">Mes Calendriers</Typography>
            <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
            {cal.length > 0 ? (
                <Stack sx={{p:2}} spacing={2}>
                    {cal.map((c) => (
                        <Paper sx={{p:2}} elevation={2} component={Link} key={c.id} to={`/calendar/${c.id}/${c.name}`} 
                            sx={{p:2, gap:1, color:"#7C9D96", border: 2, textDecoration:"none", "&:hover":{ backgroundColor: "#7C9D96", color: "white", transform: "translateX(4px)",}}}>
                                {c.name}
                        </Paper>
                    ))}
                </Stack>
            ):(
                <Stack sx={{p:3}}>
                    <Typography>vous n'avez pas de calendrier</Typography>
                </Stack>
            )}
            <Button variant="redir" onClick={()=> setFormCal(true)}>ADD CAL</Button>
        </>

    )
}