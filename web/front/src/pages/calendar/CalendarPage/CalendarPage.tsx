import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Box, Paper, Container, Button} from "@mui/material"
import AddIcon from '@mui/icons-material/AddBox';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarPage.scss"
import SetupAdm from '../setupAdm/SetupAdm';
import FormAddResa from '../component/FormAddResa';
import DayResa from '../component/DayResa';

export default function CalendarPage(){

    const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0];
    };

    const navigate = useNavigate()
    const {id, name} = useParams<{id: string, name:string}>();
    const [events, setEvents] = useState([]);
    const [addevent, setAddEvent] = useState<"month" | "add" | "day">("month")
    const [home, setHome] = useState([])
    const [invit, setInvite] = useState([])
    const [modal, setModal] = useState<"no" | "yes" | "popup" | "home_edit" | "home_create">("no");
    const [selectedHomes, setSelectedHomes] = useState([]);
    const [selectedInvit, setSelectedInvit] = useState([]);
    const [period, setPeriod] = useState({start: new Date().toISOString(), end: new Date().toISOString()})
    const [today, setToday] = useState(formatDate(new Date()))


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
            const url = `/api/resa/reservation?calendar=${encodeURIComponent(id)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            ret.data.map((r:any) => {console.log(r)})
            if (ret.success)
                setEvents(
                    ret.data.map((r: any) => ({
                        title: r.name,
                        start: r.date_start,
                        end: r.date_end,
                        status: r.status,
                        nb_adult: r.nb_adult,
                        nb_children: r.nb_children,
                        backgroundColor: r.status ? "#7C9D96" : "#D4B483",
                        borderColor: r.status ? "#668780" : "#B8955F",
                        userby: r.userby,
                        allHome: r.allHome
                    })))
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

    useEffect(() => {
        const co = async () => {
            await updateInvit(id!)
            await AdmCal(id!)
        }
        co()
    }, [])

    useEffect(() => {
        const co = async () => {
            if (!period || !period.start || !period.end) 
                return
            await updateHome(id!)
            await updateEvent(id!, period.start!, period.end!)
        }
        co()
    }, [modal, period])

    const testHandle = (info) => {
        setToday(info.dateStr)
        setAddEvent("day")

    }

function renderDayCell(arg) {
    const date = arg.date.toLocaleDateString("sv-SE");

    const count = events.filter((event) => {
        if (!event.start || !event.status) return false;

        const eventDateS = new Date(event.start).toLocaleDateString("sv-SE");
        const eventDateE= new Date(event.end).toLocaleDateString("sv-SE");

        return ((eventDateS <= date) && (eventDateE >= date));
    }).length;
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box className="my-day-number">
                {arg.dayNumberText}
            </Box>

            {count > 0 && (
                <Box className="reservation-count">
                    <Box className="green-dot" />
                    {count}
                </Box>
            )}
        </Box>
    );
}



    return (
        <Container sx={{minHeight: "100vh"}}>
          {addevent === "month" && (
            <Box>
                <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
                    <h2>Calendrier: {name}</h2>
                    <Box>
                        <Button variant="addResa" aria-label="Ajouter une réservation" onClick={() => {setAddEvent("add")}}><AddIcon/></Button>
                        {modal === "yes" && (
                            <button onClick={() => {setModal("popup")}}>...</button>
                        )}
                    </Box>
                </Box>
                <div style={{ marginTop: "20px" }}>
                    <Paper elevation ={1} sx={{p:2, borderRadius:4}} className="my-calendar">
                        <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={testHandle}
                        // events={events}
                        datesSet={(arg) => {
                            const start = arg.start.toISOString()
                            const end = arg.end.toISOString()
                            
                            setPeriod({ start:start, end:end })
                        }}
                        dayCellContent={renderDayCell}
                        height="auto"
                        />
                    </Paper>
                </div>
            </Box>
        )}
        {addevent === "add" && (
            <FormAddResa id={id} setEvent={setAddEvent} home={home} today={today}/>
        )}
        {addevent === "day" && (
            <DayResa setEvent={setAddEvent} data={events} date={today} title={name}/>
        )}
          {modal != "no" && modal != "yes"  && (
            <div className="popup">
      		    <SetupAdm id={id!} setModal ={setModal} modal={modal} home={home} setHome={setHome}/>
            </div>
          )}
        </Container>
    );
}