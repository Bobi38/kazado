import { useState } from "react";

export default function HomeForm() {
  const [showTodo, setShowTodo] = useState(false);

  return (
    <>
      <strong className="text">Nom</strong>
      <input type="text" name="name_home" placeholder="Nom de votre home" required />

      <strong className="text">Nombre de chambre</strong>
      <input type="number" name="nb_bedroom" required />

      <strong className="text">Nombre de personne max</strong>
      <input type="number" name="nb_people" required />

      <strong className="text">Adresse</strong>
      <input type="text" name="adress" placeholder="optionnelle" />

      <h3>Options de Fin de Séjour</h3>

      <strong className="text">Activer une To-do list de Checkout ?</strong>
      <input
        type="checkbox"
        name="has_todo_checkout"
        checked={showTodo}
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
          />
        </div>
      )}
    </>
  );
}
