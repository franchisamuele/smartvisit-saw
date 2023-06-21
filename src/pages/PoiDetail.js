import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'
import ModifyDelete from '../components/ModifyDelete';
import { GlobalStateContext } from '../App';

export default function PoiDetail() {
  const { globalState } = useContext(GlobalStateContext);
  const [poi, setPoi] = useState(null);
  const { poiIndex } = useParams();
  const navigate = useNavigate();

  async function deletePoi() {
    const message = "Sei davvero sicuro di voler eliminare il punto di interesse?\nQuesta azione è irreversibile!";
    if (window.confirm(message)) {
      await deleteDoc(doc(db, "poi", poiIndex));
      navigate("/pointsOfInterest");
    }
  }

  useEffect(() => {
    const docRef = doc(db, 'poi', poiIndex);

    const getData = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPoi({ ...docSnap.data(), id: docSnap.id });
      } else {
        navigate('/NoPage');
      }
    };

    getData();
  }, []);

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

        <div className="container mb-3">
          <div className="row">
            <div className="col-12 mb-2">
              {poi.prezzoBiglietto ? (
                <>
                  <Link className="btn btn-primary mb-1" to={"/buyticket/" + "P/" + poi.id} role="button">Acquista un Biglietto</Link>{' '}
                </>
              ) : null}
              <Link className="btn btn-primary mb-1" to={"/" + poi.id} role="button">Mostra sulla mappa</Link>{' '}
              <a className="btn btn-primary mb-1" href={"https://www.google.com/maps/dir/?api=1&destination=" + poi.latitudine + "," + poi.longitudine + "&travelmode=walking"} role="button">Direzioni</a>
            </div>
          </div>

          {/* SOLO AMMINISTRATORE */}
          {globalState.admin ? <ModifyDelete id={poi.id} deletePoi={deletePoi} /> : null}
          {/* SOLO AMMINISTRATORE */}

        </div>
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
}