import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'

export default function PoiDetail() {
  const { poiIndex } = useParams();
  
  const [poi, setPoi] = useState(null);
  const poisCollectionRef = collection(db, 'poi');

  useEffect(() => {
    const getPoi = async () => {
      const data = await getDocs(poisCollectionRef);
      setPoi(data.docs.find((doc) => (doc.id == poiIndex)).data());
      
      const timestamp = new Date(poi.dataRealizzazione.seconds * 1000);
      setPoi({...poi, annoRealizzazione: timestamp.getFullYear()});
    };
    getPoi();
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="mt-4 text-center">{(poi && poi.nome) || ""}</h1>
      <p>Data realizzazione: {(poi && poi.annoRealizzazione) || ""}<br />
        Visite mensili: {(poi && poi.visiteMensili) || 0}<br />
        Visite totali: {(poi && poi.visiteTotali) || 0}<br />
        Prezzo biglietto: {(poi && poi.prezzoBiglietto) || 0} €<br /></p>

      <p>{(poi && poi.descrizione) || ""}</p>

      <div className="container mb-3">
        <div className="row">
          <div className="col-12">
            <Link className="btn btn-primary mb-1" to="/buyticket/12345" role="button">Acquista un Biglietto</Link>
            <a className="btn btn-primary mb-1" href="map.php?lat=<?php echo $row['Latitudine'] ?>&lng=<?php echo $row['Longitudine'] ?>" role="button">Mostra sulla mappa</a>
            <a className="btn btn-primary mb-1" href={"https://www.google.com/maps/dir/?api=1&destination=" + (poi && poi.coordinate) || "0" + "," + (poi && poi.coordinate) || "0" + "&travelmode=walking"} role="button">Direzioni</a>
          </div>
        </div>
      </div>

    </div>
  );
}