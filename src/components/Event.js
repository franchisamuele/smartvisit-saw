import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../App';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Event({ id, nome, nomePoi, dataOra, linkImmagine, setShouldReloadEvents, expired }) {
  const { globalState } = useContext(GlobalStateContext);

  async function deleteEvent(nomeEvento, idEvento) {
    const message = "Sei davvero sicuro di voler eliminare l'evento '" + nomeEvento + "'?\nQuesta azione è irreversibile!";
    if (window.confirm(message)) {
      await deleteDoc(doc(db, "events", idEvento));
      setShouldReloadEvents(true);
    }
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
    <div className="mt-3 card-group">
      <div className="card">
        <img src={"/images/Photos/" + linkImmagine} alt={"Immagine: " + nome} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title text-center">{nome}</h3>
          <h6 className="card-title text-center">{nomePoi}</h6>
          <h6 className="card-title text-center">{getFormattedDate(dataOra.seconds * 1000)}</h6>
        </div>
        {expired === false &&
          <div className="card-footer text-end">
            <Link to={"/buyticket/" + "E/" + id} className="btn btn-primary mt-1">Acquista un Biglietto</Link>
            {globalState.admin ? (
              <>
                {' '}<Link className="btn btn-warning mt-1" to={"/insertEvent/" + id}><i className="material-icons align-middle" style={{ color: "white" }}>edit</i></Link>
                {' '}<a onClick={() => deleteEvent(nome, id)} className="btn btn-danger mt-1"><i className="material-icons align-middle">delete</i></a>
              </>
            ) : null}
          </div>
        }
      </div>
    </div>
  );
}