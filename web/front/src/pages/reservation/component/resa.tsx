import {Card, CardContent, Typography, Grid, Paper, Stack, Tabs, Tab} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import {CardResa} from '../../../Composant/CardResa';

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
                if (ret.success)
                    setResa(ret.data.map((r: any) => ({
                        title: r.name,
                        start: r.start,
                        end: r.end,
                        status: r.status,
                        nb_adult: r.nb_adult,
                        nb_children: r.nb_children,
                        nb_bedroom: r.nb_bedroom,
                        backgroundColor: r.status === "valid" ? "#7C9D96" : "#D4B483",
                        borderColor: r.status === "valid" ? "#668780" : "#B8955F",
                        userby: r.userby,
                        allHome: r.homes
                    })))
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
            {resa.map((m) => (
                <CardResa data={m}/>
            ))}
            </>
        )}
        </>
    )
}