import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

export default function Poi() {
  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src="TODO" alt="Immagine: NOMEPOI" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-center">NOMEPOI</h5>
        </div>
        <div className="card-footer text-end">
          <Link to="/pointsOfInterest/12345" className="btn btn-primary">Dettagli</Link>
        </div>
      </div>
    </div>
  );
}