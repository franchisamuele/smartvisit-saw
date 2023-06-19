import { Link } from 'react-router-dom';

export default function Event({ id, nome, nomePoi, linkImmagine }) {
  return (
    <div className="mt-3 card-group">
      <div className="card">
        <img src={"/images/Photos/" + linkImmagine} alt={"Immagine: " + nome} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title text-center">{nome}</h3>
          <h6 className="card-title text-center">{nomePoi}</h6>
        </div>
        <div className="card-footer text-end">
          <Link to={"/buyticket/" + "E/" + id} className="btn btn-primary">Acquista un Biglietto</Link>
        </div>
      </div>
    </div>
  );
}