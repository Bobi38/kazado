import {Box, Container, Grid, Paper, Stack, Tabs, Tab, Badge} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import InfoResa from "./component/inforesa";
import Res from "./component/resa"
import Attente from './component/attente';

export default function Reservation (){

    const [valid, setValid] = useState([])
    const [aff, setAff] = useState<"resa" | "adm" >("resa");
    const [pop,setPop] = useState(null)
    


    const get_all_validation = async () => {
        try{
            const url =`/api/resa/reservationVal`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                if (ret.success)
                    setValid(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    const handleChange = (event, newValue: string) => {
        setAff(newValue);
    };

    const badgeAttente = (length: number) => {
        return (
            <Badge badgeContent={length} color="error">
                <span style={{ paddingRight: length > 0 ? 12 : 0 }}>En attente</span>
            </Badge>
        )
    }

    useEffect(() => {
        const co = async () => {
            await get_all_validation()
        }
        co()
    }, [valid])


    return (
        <Container sx={{minHeight: "100vh"}}>
            <Paper sx={{p:2, my: 2, borderRadius: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={aff} onChange={handleChange}>
                        <Tab label="Mes résa" value="resa"/>
                        <Tab label={badgeAttente(valid.length)} value="adm"/>
                    </Tabs>
                </Box>
            </Paper>
            <Paper sx={{p:1, borderRadius: 3}}>
                <Box sx={{p:3}}>
                    {aff === 'resa' && <Res/> }
                    {aff === 'adm' && <Attente valid={valid} setValid={setValid}/>}
                </Box>
            </Paper>
        </Container>
    );
}