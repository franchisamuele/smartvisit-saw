import Ticket from '../components/Ticket';
import PannelloAmministratore from '../components/PannelloAmministratore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { auth } from '../firebaseConfig';
import { GlobalStateContext } from '../App';
import { getTodayTimestamp } from './Main';

export default function Tickets() {
  const { globalState } = useContext(GlobalStateContext);
  const [tickets, setTickets] = useState([]);
  const [expiredTickets, setExpiredTickets] = useState([]);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    const getTickets = async () => {
      const ticketsSnap = await getDocs(query(collection(db, 'tickets'), where('uid', '==', auth.currentUser.uid), orderBy('dataOra')));
      const tempTickets = ticketsSnap.docs.map(doc => ({...doc.data(), id: doc.id}));

      for (let ticket of tempTickets) {
        const poiFoundSnap = await getDoc(doc(db, 'poi', ticket.idPoi));
        ticket.nomePoi = poiFoundSnap.exists() ? poiFoundSnap.data().nome : "Poi non trovato";

        if (ticket.idEvento) {
          const eventFoundSnap = await getDoc(doc(db, 'events', ticket.idEvento));
          ticket.nomeEvento = eventFoundSnap.exists() ? eventFoundSnap.data().nome : "Evento non trovato";
        }
      }

      setTickets( tempTickets.filter(ticket => ticket.dataOra.seconds >= getTodayTimestamp()) );
      setExpiredTickets( tempTickets.filter(ticket => ticket.dataOra.seconds < getTodayTimestamp()).reverse() );
    };

    getTickets();
  }, []);

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">I MIEI BIGLIETTI</h1>
      <div className='text-center'>
        <div>
          <img className="rounded-circle mb-3" referrerPolicy="no-referrer" src={auth.currentUser.photoURL} /><br />
          <p>
            Nome: {auth.currentUser.displayName}<br />
            Email: {auth.currentUser.email}
          </p>

          {/* SOLO AMMINISTRATORE */}
          {globalState.admin ? <PannelloAmministratore /> : null}
          {/* SOLO AMMINISTRATORE */}
        </div>
      </div>

      <div className="mb-3 row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        {tickets.map((ticket) => (
          <Ticket
            id={ticket.id}
            idPoi={ticket.idPoi}
            nomePoi={ticket.nomePoi}
            nomeEvento={ticket.nomeEvento}
            prezzoTotale={ticket.prezzoTotale}
            dataOra={ticket.dataOra}
          />
        ))}
      </div>

      {expiredTickets.length > 0 ? (
        <div className='w-100 text-center'>
          <button onClick={toggleExpired} className="btn btn-secondary">{showExpired ? "Nascondi" : "Mostra"} biglietti scaduti</button>
        </div>
      ) : null}

      {showExpired ? (
        <div className="mt-3 row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
          {expiredTickets.map((ticket) => (
            <Ticket
              id={ticket.id}
              idPoi={ticket.idPoi}
              nomePoi={ticket.nomePoi}
              nomeEvento={ticket.nomeEvento}
              prezzoTotale={ticket.prezzoTotale}
              dataOra={ticket.dataOra}
            />
          ))}
        </div>
      ) : null}

    </div>
  );
}