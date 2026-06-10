import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarPage.scss"

export default function CalendarPage(){
    const {id, name} = useParams<{id: string, name:string}>();
    const [events, setEvents] = useState([]);
    const [addevent, setAddEvent] = useState(false)
    const [home, setHome] = useState([])
    const [invit, setInvite] = useState([])
    const [selectedHomes, setSelectedHomes] = useState([]);

    const toggle = (id, settab: any) => {
        settab((prev) =>
            prev.includes(id)
             ? prev.filter((h) => h !== id)
            : [...prev, id]
        );
    };

    const updateHome = async (id:string) => {
        try{
            const url = `/api/calendar/HomeUpdate?calendar=${encodeURIComponent(id)}`

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
            console.log(`in add home = ${ret.message} && ${ret.id}`)
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const addResa = async (data: any, id : string) => {
        try{
            const url = `/api/calendar/HomeUpdate?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                    console.log("resa good")
            console.log(`in add home = ${ret.message} && ${ret.id}`)
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
            Date_start: d.Date_start.value,
            Date_end: d.DAte_end.value,
            nb_adult: Number(d.nb_adult.value),
            nb_children: Number(d.nb_children.value),
            Home: selectedHomes,
            Invit : invit
        }
        await addResa(dataRes, id!)
        setSelectedHomes([])
        setInvite([])
        setAddEvent(false)
    }

    useEffect(() => {
        const co = async () => {
            await updateHome(id!)
            await updateInvit(id!)
        }
        co()
    }, [])
    return (
        <div>
          <Link to="/">⬅ Retour à la liste</Link>
          {addevent === false ? (
            <>
            <div>
          <h2>Calendrier: {name}</h2>
            <button onClick={() => {setAddEvent(true)}}>+</button>
            </div>
          <div style={{ marginTop: "20px" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </div>
      </>
          ) :(
            <>
            <form className="res_form" onSubmit={resaFrom_submit}>
                <strong>Titre</strong>
                <input type="text" id="name_resa" required/>
                <strong>Date de debut</strong>
                <input type="date" id="date_start" required/>
                <strong>Date de fin</strong>
                <input type="date" id="date_end" required />
                <strong>Nombre d'adultes</strong>
                <input type="number"  name="nb_adult" required/>
                <strong>Nombre d'enfants</strong>
                <input type="number"  name="nb_children" required/>
                <strong>Invités</strong>
                {invit.map((m) => (
                  <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                    <input
                      type="checkbox"
                      checked={selectedHomes.includes(m.id)}
                      onChange={() => toggle(m.id, setInvite)}
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
                <button type="submit" disabled={selectedHomes.length === 0}>valider</button>
                {selectedHomes.length === 0 && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    Vous devez sélectionner au moins une home
                  </span>
                )}
            </form>
            </>
          )}
        </div>
    );
}