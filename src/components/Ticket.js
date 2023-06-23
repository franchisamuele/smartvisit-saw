import { Link } from "react-router-dom";
import { getFormattedDate } from "../pages/Main";

export default function Ticket({ id, idPoi, nomePoi, nomeEvento, prezzoTotale, dataOra }) {
  return (
    <div className="card-group">
      <div className="card">
        <div className="card-body">
            <h2>Biglietto # {id.slice(0,5)}</h2>
            <h6>Luogo: <Link to={"/pointsOfInterest/" + idPoi}>{nomePoi}</Link></h6>
            {nomeEvento ? (<h6>Evento: {nomeEvento}</h6>) : ""}
            <h6>Prezzo totale: {prezzoTotale} €</h6>
            <h6>{nomeEvento ? "Data e ora: " : "Data: "} {getFormattedDate(dataOra.seconds * 1000, nomeEvento)}</h6>
        </div>
      </div>
    </div>
  );
}