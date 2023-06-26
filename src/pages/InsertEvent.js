import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function InsertEvent() {
  const [event, setEvent] = useState({
    nome: "",
    nomePoi: "",
    dataOra: "",
    linkImmagine: "",
    prezzoBiglietto: ""
  });

  const [editMode, setEditMode] = useState(false);
  const { eventIndex } = useParams();

  const [pois, setPois] = useState([]);

  useEffect(() => {
    const poisUnsub = onSnapshot(query(collection(db, 'poi'), orderBy('nome')), (docSnap) => {
      setPois(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    var eventsUnsub = () => { };
    // Modifica no inserisci
    if (eventIndex) {
      eventsUnsub = onSnapshot(doc(db, 'events', eventIndex), (docSnap) => {
        if (docSnap.exists()) {
          setEditMode(true);

          const event = docSnap.data();
          setEvent({...event, dataOra: new Date((event.dataOra.seconds + 7200) * 1000).toISOString().slice(0, 16)});
        }
      });
    }
    
    return () => {
      poisUnsub();
      eventsUnsub();
    }
  }, []);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (event.prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    const res = { ...event, dataOra: Timestamp.fromDate(new Date(event.dataOra)) };

    if (!editMode) {
      const message = "Sei sicuro di voler inserire questo evento?";
      if (window.confirm(message)) {
        addDoc(collection(db, "events"), res);
        navigate('/events');
      }
    } else {
      const message = "Sei sicuro di voler modificare questo evento?";
      if (window.confirm(message)) {
        updateDoc(doc(db, 'events', eventIndex), res);
        navigate('/events');
      }
    }
  }

  function setField(e) {
    setEvent({...event, [e.target.name]: e.target.value});
  }

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">{editMode ? "Modifica" : "Inserimento"} Eventi</h1>
      <form onSubmit={handleSubmit}>
        <p>Nome: <input type="text" name="nome" value={event.nome} onChange={setField} required></input></p>
        <p>
          Punto di interesse:{' '}
          <select required name="nomePoi" value={event.nomePoi} onChange={setField}>
            <option disabled value=""> -- seleziona un poi -- </option>
            {pois.map((poi) => {
              return (
                <option key={poi.id} value={poi.nome}>{poi.nome}</option>
              );
            })}
          </select>
        </p>
        <p>Data e ora: <input type="datetime-local" name="dataOra" value={event.dataOra} onChange={setField} required></input></p>
        <p>Link immagine: <input type="text" name="linkImmagine" value={event.linkImmagine} onChange={setField} required></input></p>
        <p>Prezzo biglietto: <input type="number" name="prezzoBiglietto" value={event.prezzoBiglietto} onChange={setField} required></input></p>

        <input className="btn btn-primary" type="submit" value={editMode ? "Modifica" : "Inserisci"}></input>
      </form>
    </div>

  );
}