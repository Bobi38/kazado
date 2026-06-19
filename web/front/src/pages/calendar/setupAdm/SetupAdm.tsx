import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./SetupAdm.scss"
import HomeForm from '../../../Composant/HomeForm/homeForm';
import HomeModif from '../../../Composant/HomeModif/homeModif';

type Props = {
  id: string
  setModal: (value: string | boolean) => void
  modal : string
  home: []
  setHome: ([]) => void

}

export default function SetupAdm({id, setModal, modal, home, setHome}: Props){

    const [newInv, setNewInv] = useState([])
    const [newAdm, setNewAdm] = useState([])
    const [formHome, setFormHome] = useState(false)
    const [homeId, setHomeId] = useState()

    const AddHome = async (data: any, id:string) => {
        try{
            const url = `/api/calendar/Home?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
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

    const Add_people = async (id: string, name: string, road:string) => {
        try{
            const url = `/api/gestion/${road}?calendar=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`

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

    const newhome_submit = async (e) => {
        e.preventDefault();
        const d = e.target
        let checkoutTasks = [];
        if (d.has_todo_checkout && d.has_todo_checkout.checked) {
            const rawTasks = d.todo_init_tasks.value;
            if (rawTasks.trim() !== "") {
                checkoutTasks = rawTasks.split(',').map(task => task.trim()).filter(task => task !== "");
            }
        }
        const dataHome = {
            name: d.name_home.value,
            nb_people: Number(d.nb_people.value),
            nb_bedroom: Number(d.nb_bedroom.value),
            adress: d.adress.value || "",
            tasksArray: checkoutTasks
        };
        await AddHome(dataHome, id)
        setFormHome(false)
        setModal("popup")
    }

    const new_people = async (what: string) => {
        let value = "";     
        if (what === "admin") {
          value = document.getElementById("new_adm")?.value || "";
          Add_people(id, value, "Adm")
        }       
        else if (what === "user") {
          value = document.getElementById("new_user")?.value || "";
          Add_people(id, value, "User") 
        }
        else {
          value = document.getElementById("new_validator")?.value || "";
          Add_people(id, value, "Validator") 
        } 
        console.log(what, value);
    }

    useEffect(() => {
        const co = async () => {

        }
        co()
    }, [])

    return (
        <div>
            <button type="button" onClick={() =>(setModal("yes"))}>X</button>
            {modal === "popup" && (
            <>
            <span>Nouvelle administrateur</span>
            <input type="text" id="new_adm"></input>
            <button type="button" onClick={()=> {new_people("amd")}}>add</button>
            <span>Nouveau Validator</span>
            <input type="text" id="new_validator"></input>
            <button type="button" onClick={()=> {new_people("validator")}}>add</button>
            <span>Nouvelle utilisateur</span>
            <input type="text" id="new_user"></input>
            <button type="button" onClick={()=> {new_people("user")}}>add</button>
            <span>Les homes</span>
            {home.map((m) => (
                <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                    {m.name}
                    <button onClick={() => {setModal("home_modif"); setHomeId(m.id);}}>modif</button>
                </label>
            ))}
            <button type="button" onClick={() =>(setModal("home_add"))}>Créer Home</button>
            </>
            )}
            {modal === "home_add" && (
                <div>
                    <form onSubmit={newhome_submit}>
                        <HomeForm/>
                        <button type="submit">valider</button>
                    </form>
                </div>
            )}
            {modal === "home_modif" && (
                <>
                    <HomeModif homeid={homeId} calendar={id} setModal={setModal} />
                </>
            )}
            
        </div>

    )
}