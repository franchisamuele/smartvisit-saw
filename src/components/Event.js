import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../App';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getFormattedDate } from '../pages/Main';

export default function Event({ id, nome, nomePoi, dataOra, linkImmagine, expired }) {
  const { globalState } = useContext(GlobalStateContext);

  function deleteEvent(nomeEvento, idEvento) {
    const message = "Sei davvero sicuro di voler eliminare l'evento '" + nomeEvento + "'?\nQuesta azione è irreversibile!";
    if (window.confirm(message)) {
      deleteDoc(doc(db, "events", idEvento));
    }
  }

  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src={"/images/Photos/" + linkImmagine} alt={"Immagine: " + nome} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title text-center">{nome}</h3>
          <h6 className="card-title text-center">{nomePoi}</h6>
          <h6 className="card-title text-center">{getFormattedDate(dataOra.seconds * 1000, nome)}</h6>
        </div>
        {expired === false &&
          <div className="card-footer text-end">
            <Link to={"/buyticket/E/" + id} className="btn btn-primary mt-1">Acquista un Biglietto</Link>
            {globalState.admin ? (
              <>
                {' '}<Link className="btn btn-warning mt-1" to={"/insertEvent/" + id}><i className="material-icons align-middle" style={{ color: "white" }}>edit</i></Link>
                {' '}<button onClick={() => deleteEvent(nome, id)} className="btn btn-danger mt-1"><i className="material-icons align-middle">delete</i></button>
              </>
            ) : null}
          </div>
        }
      </div>
    </div>
  );
}