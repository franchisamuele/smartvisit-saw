
export default function EventTicket() {
  var currentPrice = 0;
  // var currentPrice = prezzo * persone;

  return (
    <div className="container">

      <form method="POST" action="buyTicket.php?idevent=<?php echo $_GET['idevent'] ?>">

        <p className="mt-3">Evento: NOMEEVENTO</p>

        <p>Luogo: NOMELUOGO
          <input type="hidden" value="<?php echo $row['Id'] ?>" name="idpoi"></input>
        </p>

        <p>Prezzo a persona: EURO €
          <input type="hidden" value="<?php echo $row['Prezzo'] ?>" name="prezzo" id="prezzo"></input>
        </p>

        <p>Data e ora: DATAORA
          <input type="hidden" value="<?php echo $row['DataOra'] ?>" name="dataora"></input>
        </p>

        <p>Persone:&nbsp;
          <input type="Text" name="persone" id="persone" default="1" placeholder="1"></input>
        </p>

        <p className="mt-5">Prezzo totale: {currentPrice} €</p>

        <input className="btn btn-primary" name="submit" type="submit" value="Acquista"></input>

      </form>
    </div>
  );
}