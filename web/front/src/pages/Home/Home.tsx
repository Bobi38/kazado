import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import { Link } from 'react-router-dom'
import "./Home.scss"

import checko from "../../tool/function.usefull"

export default function Home(){

    const navigate = useNavigate()
    const [cal, setCal] = useState([])
    const [formCal, setFormCal] = useState(false)
    const [showTodo, setShowTodo] = useState(false);


    const cal_submit = async () =>{
        try{
            const url = `/api/calendar/getMy`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                setCal(ret.data)
            else 
                console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    const AddCal = async (data: any) => {
        try{
            const url = `/api/calendar/Calendar`

            const rep = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                credentials: "include"
            })

            const ret = await rep.json()
            console.log(`in add cal = ${ret.message} && ${ret.id}`)
            return ret
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
            return {success: false}
        }

    }

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

    const FORMCall_submit = async (e) => {
        e.preventDefault();
        console.log (e.target.name.value)
        console.log (e.target.validator.checked)
        const d = e.target
        const dataCal ={
            name: d.name_cal.value,
            validator: d.validator.checked
        }
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
        const ret = await AddCal(dataCal)
        if(ret.success)
            await AddHome(dataHome, ret.id)
        setFormCal(false)
    }

    useEffect(() => {
        const co = async () => {
            if (formCal === false)
                await cal_submit();
        }
        co();
    }, [])

    return (
        <div className="home">
        {formCal === false ? (
            <>
           <h2>List de mes calendrier</h2>
            {cal.length > 0 ? (
                <div className="list_cal">
                    {cal.map((c) => (
                        <Link key={c.id} to={`/calendar/${c.id}/${c.name}`} className="mycal" >
                            . {c.name}
                        </Link>
                    ))}
                </div>
            ):(
                <div>
                    <span> vous n'avez pas de calendrier</span>
                    <button onClick={()=> setFormCal(true)}>ADD CAL</button>
                </div>
            )}
            </>
        ) : (
            <div>
            <h2>NEW CAL</h2>
            <form onSubmit={FORMCall_submit} className="Cal_form">
                <strong className="text">Nom</strong>
                <input type="text"  name="name_cal" placeholder="Nom de votre calendrier" required/>
                <strong className="text">Souhaitez_vous une politique de validation</strong>
                <input type="checkbox" name="validator" />
            <h2>Premiere Home</h2>
                <strong className="text">Nom</strong>
                <input type="text"  name="name_home" placeholder="Nom de votre home" required/>
                <strong className="text">Nombre de chambre</strong>
                <input type="number"  name="nb_bedroom" required/>
                <strong className="text">Nombre de personne max</strong>
                <input type="number"  name="nb_people" required/>
                <strong className="text">adresse</strong>
                <input type="text"  name="adress" placeholder="optionnelle" default=""/>
            <h3>Options de Fin de Séjour</h3>
                <strong className="text">Activer une To-do list de Checkout ?</strong>
                <input type="checkbox" name="has_todo_checkout" checked={showTodo} onChange={(e) => setShowTodo(e.target.checked)} />
                {showTodo && (
                <div>
                <strong className="text">Tâches initiales (séparées par des virgules)</strong>
                <textarea name="todo_init_tasks" placeholder="Ex: Sortir les poubelles, Défaire les lits, Fermer les fenêtres"></textarea></div>)}
                <button type="submit">valider</button>
            </form>
            </div>
        )}
        </div>
    )
}