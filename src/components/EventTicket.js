import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from '../firebaseConfig'
import { collection, addDoc } from "firebase/firestore";
import { getFormattedDate } from "../pages/Main";

export default function EventTicket({ data }) {
  const { ticketType } = useParams();
  const navigate = useNavigate();

  const [numeroPersone, setNumeroPersone] = useState(1);
  const currentPrice = data.prezzoBiglietto * numeroPersone;
  
  async function handleSubmit(e) {
    e.preventDefault();

    const message = `Sei sicuro di voler pagare ${currentPrice}€?`;
    if (window.confirm(message)) {
      const res = {
        uid: auth.currentUser.uid,
        nomePoi: data.nomePoi,
        nomeEvento: data.nome,
        tipo: ticketType,
        dataOra: data.dataOra,
        persone: numeroPersone,
        prezzoTotale: currentPrice
      };
      addDoc(collection(db, "tickets"), res);
  
      navigate('/tickets');
    }
  }

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <p className="mt-3">Evento: {data.nome}</p>
        <p className="mt-3">Luogo: {data.nomePoi}</p>
        <p>Prezzo a persona: {data.prezzoBiglietto} €</p>
        <p>Data e ora: {getFormattedDate(data.dataOra.seconds * 1000, data.nome)}</p>
        <p>Persone: <input type="number" value={numeroPersone} onChange={(e) => setNumeroPersone(e.target.value)} placeholder="Numero persone" required></input></p>

        <p className="mt-5">Prezzo totale: {currentPrice} €</p>

        <input className="btn btn-primary" type="submit" value="Acquista"></input>

      </form>
    </div>
  );
}