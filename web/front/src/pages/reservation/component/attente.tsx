import {Card, CardContent, Typography, Grid, Paper, Stack, Tabs, Tab} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import CardAttente from './CardAttente';

export default function Attente () {

    const [valid, setValid] = useState([])
    
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


    useEffect(() =>{
        const co = async () => {
            await get_all_validation()
        }
        co()
    }, [])

    return (
        <>
        {valid.length === 0 ? (
            <>
            <Typography>Pas de reservation en attente de validation</Typography>
            </>
        ) : (
            <>
            {valid.map((m, id) => (
                <CardAttente key={id} data={m}/>
            ))}
            </>
        )}
        </>
    )
}