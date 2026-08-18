import {Card, CardContent, Typography, Grid, Paper, Stack, Tabs, Tab} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import CardResa from './CardResa';

export default function Res () {

    const [resa, setResa] = useState([])

    const get_all_my_resa = async () => {
        try{
            const url =`/api/resa/reservationId`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                console.log(ret)
                if (ret.success)
                    setResa(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }
    }

    useEffect(() =>{
        const co = async () => {
            await get_all_my_resa()
        }
        co()
    }, [])

    return (
        <>
        {resa.length === 0 ? (
            <>
            <Typography>Pas de reservation en attente</Typography>
            </>
        ) : (
            <>
            {resa.map((m, id) => (
                <CardResa key={id} data={m}/>
            ))}
            </>
        )}
        </>
    )
}