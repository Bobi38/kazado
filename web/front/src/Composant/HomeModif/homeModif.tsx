import { useState, useEffect } from "react";

export default function HomeModif({homeid}: {homeid: number}) {

    const [homeInfo, setHomeInfo] = useState([])

    const UpdateHome = async (data: any, id:number) => {
        try{
            const url = `/api/calendar/Home?home=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'UPDATE',
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

    const get_info_home = async (id : number) => {
        try{
            const url = `/api/calendar/homeInfo?home=${encodeURIComponent(id)}`

            const rep = await fetch(url,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })

            const ret = await rep.json()
            if (ret.success)
                    setHomeInfo(ret.data)
        }catch (err){
            console.log(`error get_info_home catch front: ${err}`)
        }
    }

    const change_home = async (e) => {
        e.preventDefault();
        const d = e.target;
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
        UpdateHome(dataHome, homeid)
    }

    useEffect(() => {
        const co = async () => {
            await get_info_home(homeid)
        }
        co()
    }, [])

  return (
    <>
    <form onSubmit={change_home}>
        <strong className="text">Nom</strong>
        <input type="text" name="name_home" placeholder={homeInfo.name}/>      
        <strong className="text">Nombre de chambre</strong>
        <input type="number" name="nb_bedroom" placeholder={homeInfo.nb_bedroom}  />       
        <strong className="text">Nombre de personne max</strong>
        <input type="number" name="nb_people" placeholder={homeInfo.nb_people}/>       
        <strong className="text">Adresse</strong>
        <input type="text" name="adress" placeholder={homeInfo.adress} />      
        <h3>Options de Fin de Séjour</h3>

        {homeInfo.todo === true && (
          <>
            <strong className="text">
              Tâches initiales (séparées par des virgules)
            </strong>       
            <textarea
              name="todo_init_tasks"
              placeholder={homeInfo.todotasks}
            />
          </>
        )}

        <button type="submit">Sauvegarder</button>
    </form>
    </>
  );
}
