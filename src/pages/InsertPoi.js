import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function InsertPoi() {
  const [isChecked, setIsChecked] = useState(false);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [dataRealizzazione, setDataRealizzazione] = useState("");
  const [latitudine, setLatitudine] = useState("");
  const [longitudine, setLongitudine] = useState("");
  const [linkImmagine, setLinkImmagine] = useState("");
  const [prezzoBiglietto, setPrezzoBiglietto] = useState("");

  const [editMode, setEditMode] = useState(false);
  const { poiIndex } = useParams();
  useEffect(() => {
    if (poiIndex) { // Modifica no inserisci
      const docRef = doc(db, 'poi', poiIndex);

      const getData = async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEditMode(true);
            
          const poi = docSnap.data();

          if (poi.prezzoBiglietto)
            setIsChecked(true);

          setNome(poi.nome);
          setDescrizione(poi.descrizione);
          setDataRealizzazione(poi.dataRealizzazione);
          setLatitudine(poi.latitudine);
          setLongitudine(poi.longitudine);
          setLinkImmagine(poi.linkImmagine);
          setPrezzoBiglietto(poi.prezzoBiglietto);
        }
      };

      getData();
    }
  }, []);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (isChecked && prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    console.log(prezzoBiglietto);
    const res = { nome, descrizione, dataRealizzazione, latitudine, longitudine, linkImmagine, prezzoBiglietto };

    if (!editMode) {
      const message = "Sei sicuro di voler inserire questo poi?";
      if (window.confirm(message)) {
        await addDoc(collection(db, "poi"), res);
        navigate('/pointsOfInterest');
      }
    } else {
      const message = "Sei sicuro di voler modificare questo poi?";
      if (window.confirm(message)) {
        await updateDoc(doc(db, 'poi', poiIndex), res);
        navigate('/pointsOfInterest');
      }
    }
  }

  function handleCheckbox() {
    if (isChecked)
      setPrezzoBiglietto("");
    setIsChecked(!isChecked);
  }

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">{editMode ? "Modifica" : "Inserimento"} Punti di Interesse</h1>
      <form onSubmit={handleSubmit}>
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>Descrizione: <textarea className="w-100" rows="10" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} required></textarea></p>
        <p>Anno realizzazione: <input type="number" value={dataRealizzazione} onChange={(e) => setDataRealizzazione(e.target.value)} required></input></p>
        <p>Latitudine: <input type="number" value={latitudine} onChange={(e) => setLatitudine(e.target.value)} required></input></p>
        <p>Longitudine: <input type="number" value={longitudine} onChange={(e) => setLongitudine(e.target.value)} required></input></p>
        <p>Link immagine: <input type="text" value={linkImmagine} onChange={(e) => setLinkImmagine(e.target.value)} required></input></p>

        <p>
          <input id="prezzo" type="checkbox" checked={isChecked} onChange={handleCheckbox}></input>{' '}
          <label htmlFor="prezzo" className="form-check-label">Aggiungere prezzo di ingresso?</label><br />
        </p>
        <p>
          {isChecked ? (
            <>Prezzo biglietto: <input type="number" value={prezzoBiglietto} onChange={(e) => setPrezzoBiglietto(e.target.value)} required></input></>
          ) : null}
        </p>

        <input className="btn btn-primary" type="submit" value={editMode ? "Modifica" : "Inserisci"}></input>
      </form>
    </div>

  );
}