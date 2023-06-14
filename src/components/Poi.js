import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

export default function Poi({ id, nome }) {
  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src="TODO" alt={"Immagine: " + nome} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-center">{nome}</h5>
        </div>
        <div className="card-footer text-end">
          <Link to={"/pointsOfInterest/" + id} className="btn btn-primary">Dettagli</Link>
        </div>
      </div>
    </div>
  );
}