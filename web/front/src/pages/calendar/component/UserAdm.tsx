import {Container, Paper, Box, Stack, Typography, Button, Divider, TextField, FormControlLabel, Checkbox} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "sonner"


type Props ={
    id: string | undefined;
}

export default function UserAdm({id}: Props){

    const [invit, setInvite] = useState([])
    const [login, setLogin] = useState("");
    const [admin, setAdmin] = useState(false);

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
            console.log(invit.length)
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const Add_people = async (id: string, name: string) => {
        try{
            const url = `/api/gestion/User?calendar=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(name),
                credentials: "include"
            })

            const ret = await rep.json()
            console.log("success")
            console.log(ret.success)
            console.log(`in add home = ${ret.message} && ${ret.id}`)
            return ret
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
            return {success: false}
        }    
    }

    const Delete_people = async (id: string, name: string) => {
        try{
            const url = `/api/gestion/User?calendar=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`

            const rep = await fetch(url,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(name),
                credentials: "include"
            })

            const ret = await rep.json()
            console.log("success")
            console.log(ret.success)
            console.log(`in add home = ${ret.message} && ${ret.id}`)
            return ret
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
            return {success: false}
        }    
    }

    const Add_adm = async (id: string, name: string) => {
        try{
            const url = `/api/gestion/Adm?calendar=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(name),
                credentials: "include"
            })

            const ret = await rep.json()
            console.log(`in add home = ${ret.message} && ${ret.id}`)
            return ret
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
            return {success: false}
        }    
    }

    const handle_Add = async (e) => {
        e.preventDefault();
        console.log(login)
        console.log(admin)
        let ret = {
            success: true,
            message: "coucou"
        }
        ret = await Add_people(id!, login)
        if (admin && ret.success)
            ret = await Add_adm(id!, login)
        if (ret.success){
            toast.success(ret.message)
            await updateInvit(id!)
        }
        else
            toast.error(ret.message)
    }

    const handle_delete = async (name : string) => {
        await Delete_people(id!, name)
        await updateInvit(id!)
    }

    useEffect(() => {
        const co = async () => {
            await updateInvit(id!)
        }
        co()
    }, [])

    return (
        <>
        <Box sx={{display: "flex"}}>
            <Stack direction="row" spacing={2}>
                <TextField
                    type="login"
                    id="login"
                    label="add user login"
                    onChange={(e) => setLogin(e.target.value)}
                />
                <FormControlLabel control={<Checkbox name="adm" onChange={(e) => setAdmin(e.target.checked)}/>} label="Admin"/>
                <Button variant="valid" onClick={handle_Add}><PersonAddAltIcon/></Button>
            </Stack>
        </Box>
        <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
        <Box>
            {invit.length > 0 ? (
                <Stack direction="column" spacing={2}>
                {invit.map(people => (
                    <Stack key={people.id} direction="row" sx={{display: "flex",justifyContent: "space-between"}}> 
                    <Typography>. {people.name} - {people.email}</Typography>
                    {people.adm === true && (
                        <Typography>ADM</Typography>
                    )}
                    <Button type="button" onClick={() => handle_delete(people.name)}><DeleteIcon/></Button>
                    </Stack>

                ))}
                </Stack>
            ):(
                <Typography>no user</Typography>
    
            )}
        </Box>
        </>

    )
}