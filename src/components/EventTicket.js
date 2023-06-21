import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from '../firebaseConfig'
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

export default function EventTicket({ data }) {
  const { ticketType, index } = useParams();
  const navigate = useNavigate();

  const [numeroPersone, setNumeroPersone] = useState(1);
  const currentPrice = data.prezzoBiglietto * numeroPersone;

  const [poi, setPoi] = useState(null);
  useEffect(() => {
    const docRef = doc(db, 'poi', data.idPoi);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPoi({ ...docSnap.data(), id: docSnap.id });
      }
    };

    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = {
      uid: auth.currentUser.uid,
      idPoi: data.idPoi,
      nomeEvento: data.nome,
      idEvento: index,
      tipo: ticketType,
      data: data.dataOra,
      persone: numeroPersone,
      prezzoTotale: currentPrice
    };
    await addDoc(collection(db, "tickets"), res);

    navigate('/tickets');
  }

  function getFormattedDate(timestamp) {
    // Crea un oggetto Date utilizzando il timestamp
    const date = new Date(timestamp);

    // Estrai i componenti della data
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // I mesi in JavaScript sono indicizzati da 0 a 11, quindi aggiungi 1
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');;
    const minutes = date.getMinutes().toString().padStart(2, '0');;

    // Costruisci la stringa di output nel formato desiderato
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <p className="mt-3">Evento: {data.nome}</p>
        <p className="mt-3">Luogo: {poi ? poi.nome : "Caricamento..."}</p>
        <p>Prezzo a persona: {data.prezzoBiglietto} €</p>
        <p>Data e ora: {getFormattedDate(data.dataOra.seconds * 1000)}</p>
        <p>Persone: <input type="number" value={numeroPersone} onChange={(e) => setNumeroPersone(e.target.value)} placeholder="Numero persone" required></input></p>

        <p className="mt-5">Prezzo totale: {currentPrice} €</p>

        <input className="btn btn-primary" type="submit" value="Acquista"></input>

      </form>
    </div>
  );
}