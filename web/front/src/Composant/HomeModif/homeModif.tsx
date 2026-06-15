import { useState, useEffect } from "react";

type Props = {
  homeid: number
  calendar: string
  setModal: (value: string | boolean) => void
}

export default function HomeModif({homeid, calendar, setModal}: Props) {

    const [homeInfo, setHomeInfo] = useState([])

    const UpdateHome = async (data: any, id:number) => {
        try{
            const url = `/api/calendar/home/${encodeURIComponent(id)}?calendar=${encodeURIComponent(calendar)}`

            const rep = await fetch(url,{
                method: 'PATCH',
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

    const get_info_home = async (id: number, calendar: string) => {
        try{
            const url = `/api/calendar/home/${encodeURIComponent(id)}?calendar=${encodeURIComponent(calendar)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                    setHomeInfo(ret.data)
            console.log(ret.message)
        }catch (err){
            console.log(`error get_info_home catch front: ${err}`)
        }
    }

    const change_home = async (e) => {
        e.preventDefault();
        const d = e.target;
        let checkoutTasks = [];
        console.log(d.todo_init_tasks.value.length)
        if (d.todo_init_tasks.value.length > 0){
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
        UpdateHome(dataHome, homeid)
        setModal("popup")
    }

    useEffect(() => {
        const co = async () => {
            await get_info_home(homeid, calendar)
        }
        co()
    }, [])

  return (
    <>
    <form onSubmit={change_home}>
        <strong className="text">Nom</strong>
        <input type="text" name="name_home" defaultValue={homeInfo.name}/>      
        <strong className="text">Nombre de chambre</strong>
        <input type="number" name="nb_bedroom" defaultValue={homeInfo.nb_bedroom}  />       
        <strong className="text">Nombre de personne max</strong>
        <input type="number" name="nb_people" defaultValue={homeInfo.nb_people}/>       
        <strong className="text">Adresse</strong>
        <input type="text" name="adress" defaultValue={homeInfo.adress} />      
        <h3>Options de Fin de Séjour</h3>
            <strong className="text">
              Tâches initiales (séparées par des virgules)
            </strong>       
            <textarea
              name="todo_init_tasks"
              defaultValue={homeInfo.tasksArray}
            />
        <button type="submit">Sauvegarder</button>
    </form>
    </>
  );
}
