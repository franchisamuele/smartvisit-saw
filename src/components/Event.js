import 'bootstrap/dist/css/bootstrap.min.css'

export default function Event() {
  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src="PATHFOTO" alt="Immagine: NOMEEVENTO" className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title text-center">NOMEEVENTO</h3>
          <h6 className="card-title text-center">NOMEPOI</h6>
        </div>
        <div className="card-footer text-end">
          <a href="TODO" className="btn btn-primary">Acquista un Biglietto</a>
        </div>
      </div>
    </div>
  );
}