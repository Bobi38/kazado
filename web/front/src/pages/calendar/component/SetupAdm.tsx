import {Container, Paper, Box, Stack, Typography, Button, Divider, Tabs, Tab} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react"
import {toast} from "sonner"
import UserAdm from "./UserAdm";
import HomeAdm from "./HomeAdm";
import HomeForm from '../../../Composant/HomeForm/homeForm';
import HomeModif from '../../../Composant/HomeModif/homeModif';

type Props = {
  id: string
  setModal: (value: string | boolean) => void
  modal : string
}

export default function SetupAdm({id, setModal, modal}: Props){

    const [newInv, setNewInv] = useState([])
    const [newAdm, setNewAdm] = useState([])
    const [formHome, setFormHome] = useState(false)
    const [homeId, setHomeId] = useState()
    const [aff, setAff] = useState<"user" | "home" >("user");

    // const AddHome = async (data: any, id:string) => {
    //     try{
    //         const url = `/api/calendar/Home?calendar=${encodeURIComponent(id)}`

    //         const rep = await fetch(url,{
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify(data),
    //             credentials: "include"
    //         })

    //         const ret = await rep.json()
    //         console.log(`in add home = ${ret.message} && ${ret.id}`)
    //         return ret
    //     }catch(err){
    //         console.log(`cal_submit error TRY ${err}`)
    //         return {success: false}
    //     }    
    // }

    // const Add_people = async (id: string, name: string, road:string) => {
    //     try{
    //         const url = `/api/gestion/${road}?calendar=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`

    //         const rep = await fetch(url,{
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify(name),
    //             credentials: "include"
    //         })

    //         const ret = await rep.json()
    //         console.log(`in add home = ${ret.message} && ${ret.id}`)
    //         return ret
    //     }catch(err){
    //         console.log(`cal_submit error TRY ${err}`)
    //         return {success: false}
    //     }    
    // }

    // const newhome_submit = async (e) => {
    //     e.preventDefault();
    //     const d = e.target
    //     let checkoutTasks = [];
    //     if (d.has_todo_checkout && d.has_todo_checkout.checked) {
    //         const rawTasks = d.todo_init_tasks.value;
    //         if (rawTasks.trim() !== "") {
    //             checkoutTasks = rawTasks.split(',').map(task => task.trim()).filter(task => task !== "");
    //         }
    //     }
    //     const dataHome = {
    //         name: d.name_home.value,
    //         nb_people: Number(d.nb_people.value),
    //         nb_bedroom: Number(d.nb_bedroom.value),
    //         adress: d.adress.value || "",
    //         tasksArray: checkoutTasks
    //     };
    //     await AddHome(dataHome, id)
    //     setFormHome(false)
    //     setModal("popup")
    // }

    // const new_people = async (what: string) => {
    //     let value = "";     
    //     if (what === "admin") {
    //       value = document.getElementById("new_adm")?.value || "";
    //       Add_people(id, value, "Adm")
    //     }       
    //     else if (what === "user") {
    //       value = document.getElementById("new_user")?.value || "";
    //       Add_people(id, value, "User") 
    //     }
    //     else {
    //       value = document.getElementById("new_validator")?.value || "";
    //       Add_people(id, value, "Validator") 
    //     } 
    //     console.log(what, value);
    // }

    // useEffect(() => {
    //     const co = async () => {

    //     }
    //     co()
    // }, [])

    const handleChange = (event, newValue: string) => {
        setAff(newValue);
    };

    return (
        <Paper elevation={3} sx={{ p:2, mt:2, bt:2}}>
            <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center"}}>
                <Typography variant="FormTitle">Setting</Typography>
                <Button type="button" variant="close" onClick={()=> setModal("month")}><CloseIcon/></Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={aff} onChange={handleChange}>
                    <Tab label="User" value="user"/>
                    <Tab label="Home" value="home"/>
                </Tabs>
            </Box>
            <Divider sx={{width: "100%", borderColor: "#7C9D96", borderBottomWidth: "2px", my: 1}}/>
            <Box sx={{my:2}}>
                {aff === 'user' && <UserAdm id={id}/>}
                {/* {aff === 'home' && <HomeAdm/>} */}
            </Box>
        </Paper>
        //     {modal === "popup" && (
        //     <>
        //     <span>Nouvelle administrateur</span>
        //     <input type="text" id="new_adm"></input>
        //     <button type="button" onClick={()=> {new_people("amd")}}>add</button>
        //     <span>Nouveau Validator</span>
        //     <input type="text" id="new_validator"></input>
        //     <button type="button" onClick={()=> {new_people("validator")}}>add</button>
        //     <span>Nouvelle utilisateur</span>
        //     <input type="text" id="new_user"></input>
        //     <button type="button" onClick={()=> {new_people("user")}}>add</button>
        //     <span>Les homes</span>
        //     {home.map((m) => (
        //         <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
        //             {m.name}
        //             <button onClick={() => {setModal("home_modif"); setHomeId(m.id);}}>modif</button>
        //         </label>
        //     ))}
        //     <button type="button" onClick={() =>(setModal("home_add"))}>Créer Home</button>
        //     </>
        //     )}
        //     {modal === "home_add" && (
        //         <div>
        //             <form onSubmit={newhome_submit}>
        //                 <HomeForm/>
        //                 <button type="submit">valider</button>
        //             </form>
        //         </div>
        //     )}
        //     {modal === "home_modif" && (
        //         <>
        //             <HomeModif homeid={homeId} calendar={id} setModal={setModal} />
        //         </>
        //     )}
            
        // </div>

    )
}