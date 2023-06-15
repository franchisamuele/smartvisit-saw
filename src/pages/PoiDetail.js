import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'

export default function PoiDetail() {
  const [poi, setPoi] = useState(null);
  const { poiIndex } = useParams();

  useEffect(() => {
    const getData = async () => {
      await getDocs(collection(db, 'poi'))
        .then((querySnapshot) => {
          const data = querySnapshot.docs
            .map(((doc) => ({...doc.data(), id: doc.id})));
          setPoi(data.find((doc) => (doc.id === poiIndex)));
        });
    };
    getData();
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="mt-4 text-center">{poi ? poi.nome : "404 Not found"}</h1>
      <p>Data realizzazione: {poi ? poi.dataRealizzazione : 0}<br />
        Prezzo biglietto: {poi ? poi.prezzoBiglietto : 0} €<br /></p>

      <p>{poi ? poi.descrizione : ""}</p>

      <div className="container mb-3">
        <div className="row">
          <div className="col-12">
            <Link className="btn btn-primary mb-1" to="/buyticket/12345" role="button">Acquista un Biglietto</Link>
            <a className="btn btn-primary mb-1" href="map.php?lat=<?php echo $row['Latitudine'] ?>&lng=<?php echo $row['Longitudine'] ?>" role="button">Mostra sulla mappa</a>
            <a className="btn btn-primary mb-1" href={"https://www.google.com/maps/dir/?api=1&destination=" + (poi ? poi.latitudine : "0") + "," + (poi ? poi.longitudine : "0") + "&travelmode=walking"} role="button">Direzioni</a>
          </div>
        </div>
      </div>

    </div>
  );
}