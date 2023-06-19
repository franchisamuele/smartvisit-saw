import { Link } from 'react-router-dom';

export default function Event({ id, nome, nomePoi, linkImmagine }) {
  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src={"/images/Photos/" + linkImmagine} alt={"Immagine: " + nome} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title text-center">{nome}</h3>
          <h6 className="card-title text-center">MANCA NOME POI</h6>
        </div>
        <div className="card-footer text-end">
          <Link to="/buyticket/12345" className="btn btn-primary">Acquista un Biglietto</Link>
        </div>
      </div>
    </div>
  );
}