import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'

export default function PoiDetail() {
  const [poi, setPoi] = useState(null);
  const { poiIndex } = useParams();
  const navigate = useNavigate();

  const docRef = doc(db, 'poi', poiIndex);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPoi({...docSnap.data(), id: docSnap.id});
      } else {
        navigate('/NoPage');
      }
    };
    
    getData();
  }, []);

  return poi ? (
    <>
      <img src={"/images/Photos/" + poi.linkImmagine} className="img-fluid w-100" alt={"Immagine: " + (poi ? poi.nome : "404 Not found")}></img>
      <div className="container mt-3">
        <h1 className="mt-4 text-center">{poi.nome}</h1>
        <p>Data realizzazione: {poi.dataRealizzazione}<br />
          Prezzo biglietto: {poi.prezzoBiglietto} €<br /></p>

        <p>{poi ? poi.descrizione : ""}</p>

        <div className="container mb-3">
          <div className="row">
            <div className="col-12">
              <Link className="btn btn-primary mb-1" to={"/buyticket/" + "P/" + poi.id} role="button">Acquista un Biglietto</Link>{' '}
              <a className="btn btn-primary mb-1" href="map.php?lat=<?php echo $row['Latitudine'] ?>&lng=<?php echo $row['Longitudine'] ?>" role="button">Mostra sulla mappa</a>{' '}
              <a className="btn btn-primary mb-1" href={"https://www.google.com/maps/dir/?api=1&destination=" + poi.latitudine + "," + poi.longitudine + "&travelmode=walking"} role="button">Direzioni</a>
            </div>
          </div>
        </div>

      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
}