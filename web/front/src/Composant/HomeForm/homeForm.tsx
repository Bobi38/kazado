import { useState } from "react";

export default function HomeForm({data}:any) {
  const [showTodo, setShowTodo] = useState(false);

  console.log(data)
  const {name, nb_bedroom, nb_people, adress, has_todo_checkout, todo_init_tasks} = data || {};

  return (
    <>
      <strong className="text">Nom</strong>
      <input type="text" name="name_home" placeholder={name ? name : "Nom de votre home"}  required />

      <strong className="text">Nombre de chambre</strong>
      <input type="number" name="nb_bedroom" min={0} placeholder={nb_bedroom ? nb_bedroom : 0} required />

      <strong className="text">Nombre de personne max</strong>
      <input type="number" name="nb_people" min={0} placeholder={nb_people ? nb_people : 0} required />

      <strong className="text">Adresse</strong>
      <input type="text" name="adress" placeholder="optionnelle" value={adress} />

      <h3>Options de Fin de Séjour</h3>

      <strong className="text">Activer une To-do list de Checkout ?</strong>
      <input
        type="checkbox"
        name="has_todo_checkout"
        checked={showTodo}
        value={has_todo_checkout}
        onChange={(e) => setShowTodo(e.target.checked)}
      />

      {showTodo && (
        <div>
          <strong className="text">
            Tâches initiales (séparées par des virgules)
          </strong>
          <textarea
            name="todo_init_tasks"
            placeholder="Ex: Sortir les poubelles, Défaire les lits, Fermer les fenêtres"
            value={todo_init_tasks}
          />
        </div>
      )}
    </>
  );
}
