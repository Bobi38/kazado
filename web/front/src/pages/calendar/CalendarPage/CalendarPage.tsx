import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CalendarPage(){
    const {id} = useParams<{id: string}>();

    return (
        <div>
          <Link to="/">⬅ Retour à la liste</Link>
          <h2>Calendrier ID : {id}</h2>
          <p>Ici s'affichera le calendrier de la maison...</p>
        </div>
    );
}