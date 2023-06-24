import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from '../firebaseConfig'
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function PoiTicket({ data }) {
  const { ticketType, index: poiIndex } = useParams();
  const navigate = useNavigate();

  const [numeroPersone, setNumeroPersone] = useState(1);
  const currentPrice = data.prezzoBiglietto * numeroPersone;

  const [inputDate, setInputDate] = useState(getCurrentDate());

  function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (numeroPersone < 1) {
      return alert("Il numero di persone deve essere >= 1!");
    }

    const message = `Sei sicuro di voler pagare ${currentPrice}€?`;
    if (window.confirm(message)) {
      const res = {
        uid: auth.currentUser.uid,
        nomePoi: data.nome,
        tipo: ticketType,
        dataOra: Timestamp.fromDate(new Date(inputDate)),
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

        <p className="mt-3">Luogo: {data.nome}</p>
        <p>Prezzo a persona: {data.prezzoBiglietto} €</p>
        <p>Data: <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} min={getCurrentDate()} required></input></p>
        <p>Persone: <input type="number" value={numeroPersone} onChange={(e) => setNumeroPersone(e.target.value)} placeholder="Numero persone" required></input></p>

        <p className="mt-5">Prezzo totale: {currentPrice} €</p>

        <input className="btn btn-primary" type="submit" value="Acquista"></input>

      </form>
    </div>
  );
}