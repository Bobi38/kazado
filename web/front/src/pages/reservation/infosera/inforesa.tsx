import { useNavigate, useLocation}      from    "react-router-dom";
import { useEffect, useRef, useState }            from    "react";

type Props = {
  id: number
  setPop: (value: string | boolean) => void
  data: []
}


export default function InfoResa({id, setPop, data} : Props){
    const [rep, setRep] = useState("")

    const handle_action = async (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <button type="button" onClick={() => setPop(false)}>X</button>
            <form onSubmit={handle_action()}>
                <textarea id="message" placeholder="Ex: deja utiliser, fete de la mirtylle, trop de personnes, ..."/>
                <button type="submit" onClick={() => setRep("no")}>NO</button>
                <button type="submit" onClick={() => setRep("yes")}>YES</button>
            </form>
        </div>

    )
}