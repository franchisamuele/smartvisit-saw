import 'bootstrap/dist/css/bootstrap.min.css'

export default function Poi() {
  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src="TODO" alt="Immagine: NOMEPOI" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-center">NOMEPOI</h5>
        </div>
        <div className="card-footer text-end">
          <a className="btn btn-primary" href="TODO" role="button">Acquista un Biglietto (se POI no evento)</a>
          <a href="poiDetail.php?id=<?php echo $row['Id'] ?>" className="btn btn-primary">Dettagli</a>
        </div>
      </div>
    </div>
  );
}