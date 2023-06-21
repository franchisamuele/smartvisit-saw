import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function InsertEvent() {
  const [idPoi, setIdPoi] = useState("");
  const [nome, setNome] = useState("");
  const [dataOra, setDataOra] = useState("");
  const [linkImmagine, setLinkImmagine] = useState("");
  const [prezzoBiglietto, setPrezzoBiglietto] = useState("");

  const [pois, setPois] = useState([]);

  useEffect(() => {
    const docRef = collection(db, 'poi');

    const getPois = async () => {
      const poiArray = [];

      const docSnap = await getDocs(docRef);
      docSnap.docs.forEach((doc) => (poiArray.push({ ...doc.data(), id: doc.id })));

      setPois(poiArray.sort((a, b) => a.nome.localeCompare(b.nome)));
    };

    getPois();
  }, []);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    const res = { idPoi, nome, dataOra: Timestamp.fromDate(new Date(dataOra)), linkImmagine, prezzoBiglietto };

    const message = "Sei sicuro di voler inserire questo evento?";
    if (window.confirm(message)) {
      await addDoc(collection(db, "events"), res);
      navigate('/events');
    }
  }

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">Inserimento Eventi</h1>
      <form onSubmit={handleSubmit}>
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>
          Punto di interesse:{' '}
          <select required defaultValue="" onChange={(e) => setIdPoi(e.target.value)}>
            <option disabled value=""> -- seleziona un poi -- </option>
            {pois.map((poi) => {
              return (
                <option value={poi.id}>{poi.nome}</option>
              );
            })}
          </select>
        </p>
        <p>Data e ora: <input type="datetime-local" value={dataOra} onChange={(e) => setDataOra(e.target.value)} required></input></p>
        <p>Link immagine: <input type="text" value={linkImmagine} onChange={(e) => setLinkImmagine(e.target.value)} required></input></p>
        <p>Prezzo biglietto: <input type="number" value={prezzoBiglietto} onChange={(e) => setPrezzoBiglietto(e.target.value)} required></input></p>

        <input className="btn btn-primary" type="submit" value="Inserisci"></input>
      </form>
    </div>

  );
}