import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";

export default function Reservation (){

    const [resa, setResa] = useState([])
    
    const get_all_my_resa = async () => {
        try{
            const url =`/api/resa/reservationId`

            const rep = await fetch(url,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                })

                const ret = await rep.json()
                if (ret.success)
                    setResa(ret.data)
                else 
                    console.log(`front cal_submit success false: ${ret.message}`)
        }catch(err){
            console.log(`cal_submit error TRY ${err}`)
        }

    }

    useEffect(() =>{
        const co = async () => {
            await get_all_my_resa()
        }
        co()
    }, [])

    return (
        <div>
        <h1>Mes reservations</h1>
            {resa.map((m) => (
                <label key={m.id} style={{ display: "block", marginBottom: "5px" }}>
                   . {m.name} - {m.name_cal} - {m.homes} - {m.start.slice(0, 10)} to {m.end.slice(0, 10)} - Status: {m.status.toString()}
                </label>
            ))}
        </div>
    );
}