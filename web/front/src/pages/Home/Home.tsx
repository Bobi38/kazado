import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";
import "./Home.scss"

import checko from "../../tool/function.usefull"

export default function Home(){

    const navigate = useNavigate()
    const [cal, setCal] = useState([])


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
                console.log(`front register success false: ${ret.message}`)
        }catch(err){
            console.log(`Register error TRY ${err}`)
        }

    }

    useEffect(() => {
        const co = async () => {
            const rep = await checko()
            console.log(`je suis la reponse de checko ${rep.message}`)
            if (!rep.success){
                navigate('/login')
                return;
            }
            await cal_submit();
        }
        co();
    }, [])

    return (
        <div className="home">
           <h1>List de mes calendrier</h1>
            {cal.length > 0 && (
                <div style="list_cal">
                    {cal.map((c) => (
                        <link key={c.id} className="mycal" to={`/calendar/${c.id}`}>
                            . {c.name}
                        </link>
                    ))}
            ):(
                <span> vous n'avez pas de calendrier</span>
            )}
        </div>
    )
}