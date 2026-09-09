import {Card, CardContent, Typography, Grid, Paper, Stack, Tabs, Box} from '@mui/material'
import { useEffect, useRef, useState }            from    "react";
import {CardResa} from './CardResa';
import {toast} from 'sonner'
import {List} from 'react-window'

export default function Res () {

    const [resa, setResa] = useState([])
    const [today, setToday] = useState(new Date().toISOString().split("T")[0])

    const get_all_my_resa = async () => {
        try{
            const url =`/api/resa/reservationId`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                console.log("TASK BACK :", ret.data.map((r: any) => r.task?.length));

                if (ret.success)
                    setResa(ret.data.map((r: any) => ({
                        id: r.id_resa,
                        title: r.name,
                        start: r.start.slice(0,10),
                        end: r.end.slice(0,10),
                        calId: r.id_cal,
                        status: r.status,
                        nb_adult: r.nb_adult,
                        nb_children: r.nb_children,
                        nb_bedroom: r.nb_bedroom,
                        backgroundColor: r.status === "en attente" ? "#D4B483" : (today >=r.start.slice(0,10) && today <= r.end.slice(0,10)) ? "#7C8AA8" : "#7C9D96" ,
                        borderColor: r.status === "en attente" ? "#B8955F" : (today >=r.start.slice(0,10) && today <= r.end.slice(0,10)) ? "#3C4980" : "#668780" ,
                        userby: r.userby,
                        allHome: r.homes,
                        encours: r.status === "en attente" ? false : (today >=r.start.slice(0,10) && today <= r.end.slice(0,10)) ? true : false ,
                        task : r.task ? r.task : []
                    })))
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }
    }

    const DeleteResa = async(id: number, calId: string) =>{
        try{
            console.log("in delete")
            const url=`api/resa/dd/${encodeURIComponent(id)}?calendar=${encodeURIComponent(calId)}`
            const rep = await fetch(url,{
                    method: 'DELETE',
                    credentials: "include"
                })
                const ret = await rep.json()
                if (ret.success)
                    toast.success(ret.message)

        }catch (err){

        }
    }

    const handleDelete =  async (id: number, calId: string) => {
        await DeleteResa(id, calId)
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
            {resa.map((m : any, index: number) => (
                <CardResa key={index} data={m} handleDelete={handleDelete}/>
            ))}
            </Box>
        )}
        </>
    )
}