import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig'

export default function InsertEvent() {
  const [idPoi, setIdPoi] = useState("");
  const [nome, setNome] = useState("");
  const [nomePoi, setNomePoi] = useState("");
  const [dataOra, setDataOra] = useState("");
  const [linkImmagine, setLinkImmagine] = useState("");
  const [prezzoBiglietto, setPrezzoBiglietto] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (prezzoBiglietto < 1) {
      return alert("Il prezzo del biglietto deve essere >= 1!");
    }

    const res = { idPoi, nome, nomePoi, dataOra, linkImmagine, prezzoBiglietto };

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
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required></input></p>
        <p>Link immagine: <input type="text" value={linkImmagine} onChange={(e) => setLinkImmagine(e.target.value)} required></input></p>
        <p>Prezzo biglietto: <input type="number" value={prezzoBiglietto} onChange={(e) => setPrezzoBiglietto(e.target.value)} required></input></p>

        <input className="btn btn-primary" type="submit" value="Inserisci"></input>
      </form>
    </div>

  );
}