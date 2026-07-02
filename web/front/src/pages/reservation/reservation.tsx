import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import InfoResa from "./infosera/inforesa";

export default function Reservation (){

    const [resa, setResa] = useState([])
    const [valid, setValid] = useState([])
    const [aff, setAff] = useState<"resa" | "adm" >("resa");
    const [pop,setPop] = useState(null)
    
    const get_all_my_resa = async () => {
        try{
            const url =`/api/resa/reservationId`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                console.log(ret)
                if (ret.success)
                    setResa(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    const get_all_validation = async () => {
        try{
            const url =`/api/resa/reservationVal`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                if (ret.success)
                    setValid(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    useEffect(() =>{
        console.log("useeffect")
        const co = async () => {
            await get_all_my_resa()
            await get_all_validation()
        }
        co()
    }, [])

    return (
        <div>
            <button onClick={() => setAff("resa")}>Mes reservations</button>
            <button onClick={() => setAff("adm")}>Reservations en attente</button>
        { aff === "resa" && (
        <>
        <h1>Mes reservations</h1>
            {resa.map((m) => (
                <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                   . {m.name} - {m.name_cal} - {m.homes} - {m.start.slice(0, 10)} to {m.end.slice(0, 10)} - Status: {m.status.toString()}
                </label>
            ))}
        </>
        )}
        { aff === "adm" && (
        <>
        <h1>Les réservations en attentes de validations</h1>
            {valid.map((m) => (
                <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                   . {m.name} - {m.name_cal} - {m.homes} - {m.start.slice(0, 10)} to {m.end.slice(0, 10)}
                   <button type="button" onClick={() => (setPop(m))}>✍️</button>
                </label>
            ))}
        </>
        )}
        {pop != null && (
            <div className="popup">
                <InfoResa id={pop.id} setPop ={setPop} data={pop}/>
            </div>
        )}
        </div>
    );
}