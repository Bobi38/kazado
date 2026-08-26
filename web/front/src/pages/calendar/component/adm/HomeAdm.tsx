import {Container, Paper, Box, Stack, Typography, Button, Divider} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeForm from "../../../../Composant/HomeForm/homeForm";
import {toast} from "sonner"
import parseForm from "../../../../Composant/HomeForm/parseForm";


type Props ={
    id: string | undefined;
}

export default function HomeAdm({id}: Props){

    const [home, setHome] = useState([])
    const [event, setEvent] = useState<"list" | "add" | "modif">("list")
    const [homeId, setHomeId] = useState([])

    const init_Home = async (id:string) => {
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

    const updateHome = async (id:string, data: any, home: number) => {
        try{
            const url = `/api/calendar/home/${encodeURIComponent(home)}?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(data)
            })

            const ret = await rep.json()
            return ret.success
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const AddHome = async (id:string, data: any) => {
        try{
            const url = `/api/calendar/Home?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(data)
            })

            const ret = await rep.json()
            console.log(ret.code)
            if (ret.success === false && ret.code < 500)
                toast.error(ret.message)
            return ret.success
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const DelHome = async (id:string, home: number) => {
        try{
            const url = `/api/calendar/home/${encodeURIComponent(home)}?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",

            })

            const ret = await rep.json()
            return ret.success
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const handleDeleteHome = async (id: string) => {
        if (home.length === 1){
            toast.error("Impossible d'avoir 0 Home")
            return 
        }
        const ret = await DelHome(id,homeId.id)
        if (ret === true){
            toast.success("Home bien effacé")
            await init_Home(id!);
        }
    }

    const handleModifHome = async (e: any) => {
        e.preventDefault();
        const dataHome = parseForm(e)
        const ret = await updateHome(id!, dataHome, homeId.id)
        if(ret === true){
            toast.success("Home bien modifié")
            setEvent("list")
            await init_Home(id!);
        }
    }

    const handleAddHome = async (e: any) => {
        e.preventDefault();
        const dataHome = parseForm(e)
        const ret = await AddHome(id!, dataHome)
        if(ret === true){
            toast.success("Home bien modifié")
            setEvent("list")
            await init_Home(id!);
        }
    }

    useEffect(() => {
        if (id) {
            init_Home(id);
        }
    }, []);

    return (
        <Box>
            { event === "list" && (
                <>
                    <Box sx={{display: "flex"}}>
                        <Stack spacing={2}>
                            {home.map((h) => (
                                <Stack direction="row" spacing={2} key={h.id} sx={{ p: 2}}>
                                    <Typography variant="body1">. {h.name}</Typography>
                                    <Button variant="outlined" color="error" onClick={() => handleDeleteHome(h.id)}><DeleteIcon /></Button>
                                    <Button variant="outlined" color="error" onClick={() => {setEvent("modif");
                                                                                            setHomeId(h);
                                                                                            }}><EditIcon /></Button>
                                </Stack>
                        ))}
                    </Stack>
                    </Box>
                    <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
                    <Box sx={{ p: 2 }}>
                        <Button variant="valid" onClick={() => {setEvent("add");
                                                                setHomeId(undefined);
                                                                }}>Nouvelle Home<AddIcon /></Button>
                    </Box>
                </>
            )}
            { event === "add" && (
                <Box sx={{ p: 2 }}>
                    <Box sx={{display: "flex",alignItems: "center", my:2}}>
                        <Button variant="close" onClick={() => setEvent("list")}><ArrowBackIcon/></Button>
                        <Typography variant="h6">Ajouter nouvelle home</Typography>
                    </Box>
                    <form onSubmit={(e) => handleAddHome(e)}>
                        <Stack spacing={2}>
                            <HomeForm/>
                            <Button type="submit">valider</Button>
                        </Stack>
                    </form>
                </Box>
            )}
            { event === "modif" && (
                <Box sx={{ p: 2 }}>
                    <Box sx={{display: "flex",alignItems: "center", my:2}}>
                        <Button variant="close" onClick={() => setEvent("list")}><ArrowBackIcon/></Button>
                        <Typography variant="h6">Modifier le domicile</Typography>
                    </Box>
                    <form onSubmit={(e: any) => handleModifHome(e)}>
                        <Stack spacing={2}>
                            <HomeForm data={homeId}/>
                            <Button type="submit">valider</Button>
                        </Stack>
                    </form>
                </Box>
            )}
        </Box>
    )
}