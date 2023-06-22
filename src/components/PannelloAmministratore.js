import { Link } from 'react-router-dom';

export default function PannelloAmministratore() {
  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-12">
          <Link className="btn btn-success" to={"/insertPoi"} role="button">Inserisci un POI</Link>{' '}
          <Link className="btn btn-success" to={"/insertEvent"} role="button">Inserisci un Evento</Link>
        </div>
      </div>
    </div>
  );
}