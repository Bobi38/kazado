import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/AddBox';
import { useEffect, useState } from "react"
import { CardResa } from "./CardResa";


type Props ={
    setEvent: (mod: string)=> void;
    data: [] | never[];
    date: string;
    title: string
}

export default function DayResa({setEvent, data, date, title}: Props){

    const [dataParse, setDataParse] = useState([])

    useEffect(() =>{
        const parse = data.filter((event) =>{
            if (!event.start) return false;
            const eventDateS = new Date(event.start).toLocaleDateString("sv-SE");
            const eventDateE= new Date(event.end).toLocaleDateString("sv-SE");

            return ((eventDateS <= date) && (eventDateE >= date))
        })
        setDataParse(parse)
    }, [])

    return (
        <Box sx={{p:2}}>
            <Button sx={{color:"#7C9D96"}} startIcon={<ArrowBackIosIcon/>} onClick={() => {setEvent("month")}}>{title}</Button>
            <Paper elevation={3} sx={{ p:2, mt:2, bt:2, borderRadius:5}}>
                <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
                    <Typography variant="FormTitle">{date}</Typography>
                    <Button variant="addResa" sx={{height:35, width:30, minWidth:35,}} onClick={() => {setEvent("add")}}><AddIcon/></Button>
                </Box>
                <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
                {dataParse && dataParse.length > 0 ? (
                    <Box>
                        {dataParse.map((m, key) =>(
                            <CardResa data={m}/>
                        ))}
                    </Box>
                ):(
                    <>
                        <Typography>Aucun évènement</Typography>
                    </>
                )}
            </Paper>
        </Box>

    )
}
