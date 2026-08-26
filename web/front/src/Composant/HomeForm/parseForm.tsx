export default function parseForm(e: any){
    const d = e.target
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
    return dataHome 
}