import 'bootstrap/dist/css/bootstrap.min.css'

export default function Ticket() {
  return (
    <div className="card-group mt-2 mb-1">
      <div className="card">
        <div className="card-body">
          <p>
            <h2>Biglietto # IDBIGLIETTO</h2>
            <h6>Luogo: NOMELUOGO</h6>
            <h6>Evento: NOMEEVENTO (se è un evento, altrimenti nulla)</h6>
            <h6>Prezzo: EURO €</h6>
            <h6>Data e ora: DATAORA</h6>
          </p>
        </div>
      </div>
    </div>
  );
}