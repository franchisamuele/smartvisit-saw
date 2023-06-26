import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function InsertPoi() {
  const [isChecked, setIsChecked] = useState(false);
  const [poi, setPoi] = useState({
    nome: '',
    descrizione: '',
    dataRealizzazione: '',
    latitudine: '',
    longitudine: '',
    linkImmagine: '',
    prezzoBiglietto: null
  });

  const [editMode, setEditMode] = useState(false);
  const { poiIndex } = useParams();
  useEffect(() => {
    if (poiIndex) { // Modifica no inserisci
      return onSnapshot(doc(db, 'poi', poiIndex), (docSnap) => {
        if (docSnap.exists()) {
          setEditMode(true);

          const poi = docSnap.data();

          if (poi.prezzoBiglietto)
            setIsChecked(true);

          setPoi({...poi});
        }
      });      
    }
  }, []);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (isChecked && poi.prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    if (!editMode) {
      const message = "Sei sicuro di voler inserire questo poi?";
      if (window.confirm(message)) {
        addDoc(collection(db, "poi"), poi);
        navigate('/pointsOfInterest');
      }
    } else {
      const message = "Sei sicuro di voler modificare questo poi?";
      if (window.confirm(message)) {
        updateDoc(doc(db, 'poi', poiIndex), poi);
        navigate('/pointsOfInterest');
      }
    }
  }

  function handleCheckbox() {
    if (isChecked)
      setPoi({...poi, prezzoBiglietto: null})
    setIsChecked(!isChecked);
  }

  function setField(e) {
    setPoi({...poi, [e.target.name]: e.target.value});
  }

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">{editMode ? "Modifica" : "Inserimento"} Punti di Interesse</h1>
      <form onSubmit={handleSubmit}>
        <p>Nome: <input type="text" name="nome" value={poi.nome} onChange={setField} required></input></p>
        <p>Descrizione: <textarea className="w-100" rows="10" name="descrizione" value={poi.descrizione} onChange={setField} required></textarea></p>
        <p>Anno realizzazione: <input type="number" name="dataRealizzazione" value={poi.dataRealizzazione} onChange={setField} required></input></p>
        <p>Latitudine: <input type="number" name="latitudine" value={poi.latitudine} onChange={setField} required></input></p>
        <p>Longitudine: <input type="number" name="longitudine" value={poi.longitudine} onChange={setField} required></input></p>
        <p>Link immagine: <input type="text" name="linkImmagine" value={poi.linkImmagine} onChange={setField} required></input></p>

        <p>
          <input id="prezzo" type="checkbox" checked={isChecked} onChange={handleCheckbox}></input>{' '}
          <label htmlFor="prezzo" className="form-check-label">Aggiungere prezzo di ingresso?</label><br />
        </p>
        <p>
          {isChecked ? (
            <>Prezzo biglietto: <input type="number" name="prezzoBiglietto" value={poi.prezzoBiglietto || ""} onChange={setField} required></input></>
          ) : null}
        </p>

        <input className="btn btn-primary" type="submit" value={editMode ? "Modifica" : "Inserisci"}></input>
      </form>
    </div>

  );
}