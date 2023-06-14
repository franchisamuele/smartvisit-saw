import 'bootstrap/dist/css/bootstrap.min.css'

export default function PoiTicket() {
  var currentPrice = 0;
  // var currentPrice = prezzo * persone;

  return (
    <div className="container">

      <form method="POST" action="buyTicket.php?idpoi=<?php echo $_GET['idpoi'] ?>">

        <p className="mt-3">Luogo: NOMELUOGO</p>

        <p>Prezzo a persona: EURO €
          <input type="hidden" value="<?php echo $row['Prezzo'] ?>" name="prezzo" id="prezzo"></input>
        </p>

        <p>Data: <input name="data" type="date" required></input></p>

        <p>Persone:&nbsp;
          <input type="Text" name="persone" id="persone" default="1" placeholder="1"></input>
        </p>

        <p className="mt-5">Prezzo totale: {currentPrice} €</p>

        <input className="btn btn-primary" name="submit" type="submit" value="Acquista"></input>

      </form>
    </div>
  );
}