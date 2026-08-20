import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import {toast} from "sonner"


type Props ={
    id: string | undefined;
    setEvent: (mod: string)=> void;
    home: [] | never[];
    today: string
}

export default function FormAddResa({id, setEvent, home, today}: Props){
    
    const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0];
    };

    const [selectedHomes, setSelectedHomes] = useState([]);
    const [selectedInvit, setSelectedInvit] = useState([]);
    const [invit, setInvite] = useState([])
    const [dateStart, setDateStart] = useState(formatDate(new Date()));


    const toggle = (id, settab: any) => {
        settab((prev) =>
            prev.includes(id)
             ? prev.filter((h) => h !== id)
            : [...prev, id]
        );
    };
    
    const updateInvit = async (id:string) => {
        try{
            const url = `/api/calendar/AllUsers?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                    setInvite(ret.data)
            console.log(`in allUser = ${ret.message} && ${ret.id}`)
            console.log(invit)
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const addResa = async (data: any, id : string) => {
        try{
            const url = `/api/resa/reservation?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success){
                toast.success(ret.message)
                return true
            }
            toast.error(ret.message)
            return false
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const resaFrom_submit = async (e) => {
        e.preventDefault();
        const d = e.target;
        if (selectedHomes.length === 0)
            return ;
        const dataRes = {
            name: d.name_resa.value,
            date_start: d.date_start.value,
            date_end: d.date_end.value,
            nb_adult: Number(d.nb_adult.value),
            nb_children: Number(d.nb_children.value),
            Home: selectedHomes,
            Invit : selectedInvit
        }
        const res = await addResa(dataRes, id)
        setSelectedHomes([])
        setSelectedInvit([])
        setInvite([])
        if (res)
            setEvent("month")
    }

    useEffect(() => {
        const co = async () => {
            await updateInvit(id!)
        }
        co()
    },[])

    return (
        <Paper elevation={3} sx={{ p:2, mt:2, bt:2}}>
            <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
                <Typography variant="FormTitle">Nouvelle réservation</Typography>
                <Button type="button" variant="close" onClick={()=> setEvent("month")}><CloseIcon/></Button>
            </Box>
            <form onSubmit={resaFrom_submit}>
                <Stack sx={{p:2}} spacing={2}>
                <strong>Titre</strong>
                <input type="text" id="name_resa" required/>
                <strong>Date de debut</strong>
                <input type="date" id="date_start" value={dateStart > today ? dateStart : today} min={today} onChange={(e) => setDateStart(e.target.value)} required/>
                <strong>Date de fin</strong>
                <input type="date" id="date_end" min={dateStart > today ? dateStart: today}  required />
                <strong>Nombre d'adultes</strong>
                <input type="number"  name="nb_adult" min="1" required/>
                <strong>Nombre d'enfants</strong>
                <input type="number"  name="nb_children" min="0" required/>
                <strong>Invités</strong>
                {invit.map((m) => (
                  <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                    <input
                      type="checkbox"
                      checked={selectedInvit.includes(m.id)}
                      onChange={() => toggle(m.id, setSelectedInvit)}
                    />
                    {m.name}
                  </label>
                ))}
                <strong>Selectionne les "home" reservés</strong>
                {home.map((m) => (
                  <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                    <input
                      type="checkbox"
                      checked={selectedHomes.includes(m.id)}
                      onChange={() => toggle(m.id, setSelectedHomes)}
                    />
                    {m.name}
                  </label>
                ))}
                <Button type="submit" variant="valid" disabled={selectedHomes.length === 0}>valider</Button>
                {selectedHomes.length === 0 && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    Vous devez sélectionner au moins une home
                  </span>
                )}
                </Stack>
            </form>
        </Paper>
    )
}