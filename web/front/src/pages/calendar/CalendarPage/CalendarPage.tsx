import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarPage.scss"
import SetupAdm from '../setupAdm/SetupAdm';

export default function CalendarPage(){

    const navigate = useNavigate()
    const {id, name} = useParams<{id: string, name:string}>();
    const [events, setEvents] = useState([]);
    const [addevent, setAddEvent] = useState(false)
    const [home, setHome] = useState([])
    const [invit, setInvite] = useState([])
    const [modal, setModal] = useState<"no" | "yes" | "popup" | "home_edit" | "home_create">("no");
    const [selectedHomes, setSelectedHomes] = useState([]);
    const [selectedInvit, setSelectedInvit] = useState([]);
    const [period, setPeriod] = useState<{start: string, end: string} | null>(null)

    const toggle = (id, settab: any) => {
        settab((prev) =>
            prev.includes(id)
             ? prev.filter((h) => h !== id)
            : [...prev, id]
        );
    };


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

    const updateEvent = async (id:string, start: string, end: string) => {
        try{
            console.log(`start = ${start} end = ${end}`)
            const url = `/api/resa/reservation?calendar=${encodeURIComponent(id)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                setEvents(
                    ret.data.map((r: any) => ({
                      title: r.name,          // obligatoire
                      start: r.date_start,    // obligatoire
                      end: r.date_end,
                        backgroundColor: r.status ? "#22c55e" : "#f59e0b", // vert / orange
                        borderColor: r.status ? "#16a34a" : "#d97706",
                    })))
            console.log(`in getresa = ${ret.message} && ${ret.data}`)
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
            console.log(`in allUser = ${ret.message} && ${ret.id}`)
            console.log(invit)
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const AdmCal = async (id:string) => {
        try{
            const url = `/api/gestion/setAdm?calendar=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.code == 404)
                navigate('/')
            if (ret.success)
                    setModal(ret.bool)
            console.log(`in ADMCAL = ${ret.message} && ${ret.bool}`)
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
            if (ret.success)
                    console.log("resa good")
            console.log(`in add home = ${ret.message} && ${ret.id}`)
        }catch(err){
            console.log(`error front catch update ${err}`)
        }
    }

    const resaFrom_submit = async (e) => {
        console.log("JE SUIS LA")
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

        console.log("APRES LA DATA")
        console.log(`data from = ${dataRes.date_end}`)
        await addResa(dataRes, id!)
        setSelectedHomes([])
        setSelectedInvit([])
        setInvite([])
        setAddEvent(false)
        updateEvent(id!, period.start!, period.end!)
    }

    useEffect(() => {
        const co = async () => {
            await updateInvit(id!)
            await AdmCal(id!)
        }
        co()
    }, [])

    useEffect(() => {
        const co = async () => {
            await updateHome(id!)
        }
        co()
    }, [modal])

    useEffect(() => {
        const t = async () => {
            if (!period || !period.start || !period.end) 
                return
            await updateEvent(id!, period.start!, period.end!)
            }
        t()
    }, [period])

    return (
        <div>
          <Link to="/">⬅ Retour à la liste</Link>
          {addevent === false ? (
            <>
            <div>
          <h2>Calendrier: {name}</h2>
            <button onClick={() => {setAddEvent(true)}}>+</button>
            {modal === "yes" && (
                <button onClick={() => {setModal("popup")}}>...</button>
            )}
            </div>
          <div style={{ marginTop: "20px" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
            datesSet={(arg) => {
              const start = arg.start.toISOString()
              const end = arg.end.toISOString()
            
              setPeriod({ start:start, end:end })
            }}
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
                <input type="date" id="date_end" min="date_start" required />
                <strong>Nombre d'adultes</strong>
                <input type="number"  name="nb_adult" required/>
                <strong>Nombre d'enfants</strong>
                <input type="number"  name="nb_children" required/>
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
                <button type="submit" disabled={selectedHomes.length === 0}>valider</button>
                {selectedHomes.length === 0 && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    Vous devez sélectionner au moins une home
                  </span>
                )}
            </form>
            </>
          )}
          {modal != "no" && modal != "yes"  && (
            <div className="popup">
      		    <SetupAdm id={id!} setModal ={setModal} modal={modal} home={home} setHome={setHome}/>
            </div>
          )}
        </div>
    );
}