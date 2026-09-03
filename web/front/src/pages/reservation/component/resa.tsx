import {Card, CardContent, Typography, Grid, Paper, Stack, Tabs, Box} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import {CardResa} from './CardResa';
import {toast} from 'sonner'
import {List} from 'react-window'

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
                        id: r.id,
                        title: r.name,
                        start: r.start,
                        end: r.end,
                        calId: r.id_cal,
                        status: r.status,
                        nb_adult: r.nb_adult,
                        nb_children: r.nb_children,
                        nb_bedroom: r.nb_bedroom,
                        backgroundColor: r.status === "validé" ? "#7C9D96" : "#D4B483",
                        borderColor: r.status === "validé" ? "#668780" : "#B8955F",
                        userby: r.userby,
                        allHome: r.homes
                    })))
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }
    }

    const DeleteResa = async(id: number, calId: string) =>{
        try{
            const url=`api/resa/delete/id=${encodeURIComponent(id)}&calendar=${encodeURIComponent(calId)}`
            const rep = await fetch(url,{
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })
                const ret = await rep.json()
                if (ret.success)
                    toast.success(ret.message)

        }catch (err){

        }
    }

    const handleDelete =  async (id: number) => {
        await DeleteResa(id)
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
            <Box sx={{ maxHeight: 400, overflowY: "auto"}}>
            {resa.map((m) => (
                <CardResa data={m} handleDelete={handleDelete}/>
            ))}
            </Box>
        )}
        </>
    )
}