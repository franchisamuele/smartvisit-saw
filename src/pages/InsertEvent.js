import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function InsertEvent() {
  const [nome, setNome] = useState("");
  const [nomePoi, setNomePoi] = useState("");
  const [dataOra, setDataOra] = useState("");
  const [linkImmagine, setLinkImmagine] = useState("");
  const [prezzoBiglietto, setPrezzoBiglietto] = useState("");

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

          setNome(event.nome);
          setNomePoi(event.nomePoi);
          setDataOra(new Date((event.dataOra.seconds + 7200) * 1000).toISOString().slice(0, 16));
          setLinkImmagine(event.linkImmagine);
          setPrezzoBiglietto(event.prezzoBiglietto);
        }
      });
    }
    
    return () => {
      poisUnsub();
      eventsUnsub();
    }
  }, []);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    const res = { nomePoi, nome, dataOra: Timestamp.fromDate(new Date(dataOra)), linkImmagine, prezzoBiglietto };

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

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">{editMode ? "Modifica" : "Inserimento"} Eventi</h1>
      <form onSubmit={handleSubmit}>
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>
          Punto di interesse:{' '}
          <select required value={nomePoi} onChange={(e) => setNomePoi(e.target.value)}>
            <option disabled value=""> -- seleziona un poi -- </option>
            {pois.map((poi) => {
              return (
                <option key={poi.id} value={poi.nome}>{poi.nome}</option>
              );
            })}
          </select>
        </p>
        <p>Data e ora: <input type="datetime-local" value={dataOra} onChange={(e) => setDataOra(e.target.value)} required></input></p>
        <p>Link immagine: <input type="text" value={linkImmagine} onChange={(e) => setLinkImmagine(e.target.value)} required></input></p>
        <p>Prezzo biglietto: <input type="number" value={prezzoBiglietto} onChange={(e) => setPrezzoBiglietto(e.target.value)} required></input></p>

        <input className="btn btn-primary" type="submit" value={editMode ? "Modifica" : "Inserisci"}></input>
      </form>
    </div>

  );
}