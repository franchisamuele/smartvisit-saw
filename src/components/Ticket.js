
export default function Ticket({ id, nomePoi, nomeEvento, prezzoTotale, data }) {
  function getFormattedDate(timestamp) {
    // Crea un oggetto Date utilizzando il timestamp
    const date = new Date(timestamp);

    // Estrai i componenti della data
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // I mesi in JavaScript sono indicizzati da 0 a 11, quindi aggiungi 1
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');;
    const minutes = date.getMinutes().toString().padStart(2, '0');;

    // Costruisci la stringa di output nel formato desiderato
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  
  return (
    <div className="card-group mt-2 mb-1">
      <div className="card">
        <div className="card-body">
            <h2>Biglietto # {id.slice(0,5)}</h2>
            <h6>Luogo: {nomePoi}</h6>
            {nomeEvento ? (<h6>Evento: {nomeEvento}</h6>) : ""}
            <h6>Prezzo totale: {prezzoTotale} €</h6>
            <h6>Data e ora: {getFormattedDate(data.seconds * 1000)}</h6>
        </div>
      </div>
    </div>
  );
}