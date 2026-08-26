import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import HomeForm from "../../../Composant/HomeForm/homeForm";
import {toast} from "sonner"


type Props ={
    id: string | undefined;
}

export default function HomeAdm({id}: Props){

    const [home, setHome] = useState([])
    const [event, setEvent] = useState<"list" | "add" | "modif">("list")
    const [homeId, setHomeId] = useState<string | undefined>(undefined)

    const updateHome = async (id:string) => {
        try{
            const url = `/api/calendar/AllHomes?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                    setHome(ret.data)
            console.log(`in add home = ${ret.message} && ${ret.id}`)
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    useEffect(() => {
        if (id) {
            updateHome(id);
        }
    }, []);

    return (
        <Container>
            { event === "list" && (
                <Box sx={{display: "flex"}}>
                    <Stack spacing={2}>
                        {home.map((h) => (
                            <Box key={h.id} sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                                <Typography variant="body1">{h.name}</Typography>
                            <Button variant="outlined" color="error" onClick={() => handleDeleteHome(h.id)}><DeleteIcon /></Button>
                            <Button variant="outlined" color="error" onClick={() => setEvent("modif") && setHomeId(h.id)}><EditIcon /></Button>
                        </Box>
                    ))}
                </Stack>
                </Box>
                <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
                <Box sx={{ p: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => setEvent("add") && setHomeId(undefined)}><AddIcon /></Button>
                </Box>
            )}
            { event === "add" && (
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Ajouter un nouveau domicile</Typography>
                    <form onSubmit={(e) => {handleAddHome()}}>
                        <Stack spacing={2}>
                            <HomeForm/>
                            <button type="submit">valider</button>
                        </Stack>
                    </form>
                </Box>
            )}
            { event === "modif" && (
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Modifier le domicile</Typography>

                </Box>
            )}
        </Container>
    )
}