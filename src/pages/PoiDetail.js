import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'
import ModifyDelete from '../components/ModifyDelete';
import { GlobalStateContext } from '../App';
import { sendNotification } from '../index';

export default function PoiDetail() {
  const { globalState } = useContext(GlobalStateContext);
  const [poi, setPoi] = useState(null);
  const { poiIndex } = useParams();
  const navigate = useNavigate();

  const deletePoi = async () => {
    const message = "Sei davvero sicuro di voler eliminare il punto di interesse?\nQuesta azione è irreversibile!";
    if (window.confirm(message)) {
      deleteDoc(doc(db, "poi", poiIndex));
      navigate("/pointsOfInterest");
    }
  }

  useEffect(() => {
    const getData = async () => {
      const poiSnap = await getDoc(doc(db, 'poi', poiIndex));

      if (poiSnap.exists()) {
        setPoi({ ...poiSnap.data(), id: poiSnap.id });
        return poiSnap.data().nome;
      } else {
        navigate('/NoPage');
      }
    };

    getData();
  }, [navigate, poiIndex]);

  useEffect(() => {
    /* Questa notifica doveva comparire quando l'utente si avvicinava al punto di interesse col telefono
       con link alla pagina del dettaglio, tipo "Scopri di più su nomePoi".
       Per non rendere l'applicazione troppo complessa con i calcoli per capire se l'utente si trova nel raggio del POI
       l'ho implementata in modo più semplice (e stupido)
    */
    if (poi)
      sendNotification(poi.nome, 'Clicca per visualizzare sulla mappa', "/images/Photos/" + poi.linkImmagine, '/' + poi.id, navigate);
  }, [poi]);

  return poi ? (
    <>
      <img src={"/images/Photos/" + poi.linkImmagine} className="img-fluid w-100" style={{ maxWidth: 1000, display: "block", margin: "0 auto" }} alt={"Immagine: " + (poi ? poi.nome : "404 Not found")}></img>
      <div className="container mt-3">
        <h1 className="mt-4 text-center">{poi.nome}</h1>
        <p>Data realizzazione: {poi.dataRealizzazione}<br />
          {poi.prezzoBiglietto ?
            <>Prezzo biglietto: {poi.prezzoBiglietto} €<br /></>
            : null}
        </p>

        <p>{poi ? poi.descrizione : ""}</p>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-8 mb-2">
              {poi.prezzoBiglietto ? (
                <>
                  <Link className="btn btn-primary mb-1" to={"/buyticket/P/" + poi.id} role="button">Acquista un Biglietto</Link>{' '}
                </>
              ) : null}
              <Link className="btn btn-primary mb-1" to={"/" + poi.id} role="button">Mostra sulla mappa</Link>{' '}
              <a className="btn btn-primary mb-1" href={"https://www.google.com/maps/dir/?api=1&destination=" + poi.latitudine + "," + poi.longitudine + "&travelmode=walking"} role="button">Direzioni</a>
            </div>

            {/* SOLO AMMINISTRATORE */}
            {globalState.admin &&
              <div className="col-sm-12 col-lg-4 mb-2 text-end">
                <ModifyDelete id={poi.id} deletePoi={deletePoi} />
              </div>
            }
            {/* SOLO AMMINISTRATORE */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
}