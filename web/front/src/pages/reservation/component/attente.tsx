import {Card, CardContent, Typography, Grid, Paper, Stack, Tabs, Tab} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import CardAttente from './CardAttente';

export default function Attente () {

    const [valid, setValid] = useState([])
    const [resaId, setResaId] = useState(null)
    const [action, setAction] = useState(null)

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

    const validateReservation = async () => {
        try{
            const url =`/api/resa/validation&resaId=${encodeURIComponent(resaId.id)}&calId=${encodeURIComponent(resaId.id_cal)}`

            const rep = await fetch(url,{
                    method: 'PATCH',
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

    const rejectReservation = async () => {
        try{
            const url =`/api/resa/reject&resaId=${encodeURIComponent(resaId.id)}&calId=${encodeURIComponent(resaId.id_cal)}`

            const rep = await fetch(url,{
                    method: 'DELETE',
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

    const handleValidation = async () => {
        if (action === "accept" && resaId) {
            await validateReservation()
        }
        if (action === "reject" && resaId) {
            await rejectReservation()
        }
        setAction(null)
        setResaId(null)
    }

    useEffect(() =>{
        const co = async () => {
            await get_all_validation()
        }
        co()
    }, [])

    useEffect(() =>{
        const co = async () => {
            if (resaId)
                await handleValidation()
        }
        co()
    }, [resaId])

    return (
        <>
        {valid.length === 0 ? (
            <>
            <Typography>Pas de reservation en attente de validation</Typography>
            </>
        ) : (
            <>
            {valid.map((m, id) => (
                <CardAttente key={id} data={m} setResaId={setResaId} setAction={setAction} />
            ))}
            </>
        )}
        </>
    )
}