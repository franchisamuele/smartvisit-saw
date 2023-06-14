import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom';

export default function PoiDetail() {
  const { poiIndex } = useParams();

  return (
    <div className="container mt-3">
      <h1 className="mt-4 text-center">NOMEPOI</h1>
      <p>Data realizzazione: DATAREALIZZAZIONE<br />
        Visite mensili: VISITEMESESCORSO<br />
        Visite totali: VISITETOTALI<br /></p>

      <p>Descrizione Lorem ipsum ciao ciao</p>

      <div className="container mb-3">
        <div className="row">
          <div className="col-12">
            PREZZOSEPOI<Link className="btn btn-primary mb-1" to="/buyticket/12345" role="button">Acquista un Biglietto</Link>
            <a className="btn btn-primary mb-1" href="map.php?lat=<?php echo $row['Latitudine'] ?>&lng=<?php echo $row['Longitudine'] ?>" role="button">Mostra sulla mappa</a>
            <a className="btn btn-primary mb-1" href="https://www.google.com/maps/dir/?api=1&destination=<?php echo $row['Latitudine'] ?>,<?php echo $row['Longitudine'] ?>&travelmode=walking" role="button">Direzioni</a>
          </div>
        </div>
      </div>

    </div>
  );
}