import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function AdminPoi() {
  const [isChecked, setIsChecked] = useState(false);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [dataRealizzazione, setDataRealizzazione] = useState("");
  const [latitudine, setLatitudine] = useState("");
  const [longitudine, setLongitudine] = useState("");
  const [linkImmagine, setLinkImmagine] = useState("");
  const [prezzoBiglietto, setPrezzoBiglietto] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (isChecked && prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    const res = { nome, descrizione, dataRealizzazione, latitudine, longitudine, linkImmagine, ...(isChecked && { prezzoBiglietto }) };
    await addDoc(collection(db, "poi"), res);

    navigate('/pointsOfInterest');
  }

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">Inserimento Punti di Interesse</h1>
      <form onSubmit={handleSubmit}>
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>Descrizione: <textarea className="w-100" rows="10" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} required></textarea></p>
        <p>Anno realizzazione: <input type="number" value={dataRealizzazione} onChange={(e) => setDataRealizzazione(e.target.value)} required></input></p>
        <p>Latitudine: <input type="number" value={latitudine} onChange={(e) => setLatitudine(e.target.value)} required></input></p>
        <p>Longitudine: <input type="number" value={longitudine} onChange={(e) => setLongitudine(e.target.value)} required></input></p>
        <p>LinkImmagine: <input type="text" value={linkImmagine} onChange={(e) => setLinkImmagine(e.target.value)} required></input></p>

        <p>
          <input id="prezzo" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>{' '}
          <label htmlFor="prezzo" class="form-check-label" for="remember">Aggiungere prezzo di ingresso?</label><br />
        </p>
        <p>
          {isChecked ? (
            <>Prezzo biglietto: <input type="number" value={prezzoBiglietto} onChange={(e) => setPrezzoBiglietto(e.target.value)} required></input></>
        ) : null}
        </p>

        <input className="btn btn-primary" type="submit" value="Inserisci"></input>
      </form>
    </div>

  );
}