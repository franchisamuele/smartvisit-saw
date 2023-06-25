import Ticket from '../components/Ticket';
import PannelloAmministratore from '../components/PannelloAmministratore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth } from '../firebaseConfig';
import { GlobalStateContext } from '../App';
import { getTodayTimestamp } from './Main';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Tickets() {
  const [loading, setLoading] = useState(true);
  const { globalState } = useContext(GlobalStateContext);
  const [tickets, setTickets] = useState([]);
  const [expiredTickets, setExpiredTickets] = useState([]);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    return onSnapshot(query(collection(db, 'tickets'), where('uid', '==', auth.currentUser.uid), orderBy('dataOra')), (ticketsSnap) => {
      const tempTickets = ticketsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setTickets(tempTickets.filter(ticket => ticket.dataOra.seconds >= getTodayTimestamp()));
      setExpiredTickets(tempTickets.filter(ticket => ticket.dataOra.seconds < getTodayTimestamp()).reverse());
      setLoading(false);
    });
  }, []);

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4 text-center">I MIEI BIGLIETTI</h1>
      <div className='text-center'>
        <div>
          <img className="rounded-circle mb-3" referrerPolicy="no-referrer" src={auth.currentUser.photoURL} alt="Foto profilo" style={{width: "96px", height: "96px"}} /><br />
          <p>
            Nome: {auth.currentUser.displayName}<br />
            Email: {auth.currentUser.email}
          </p>

          {/* SOLO AMMINISTRATORE */}
          {globalState.admin ? <PannelloAmministratore /> : null}
          {/* SOLO AMMINISTRATORE */}
        </div>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
            {tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                id={ticket.id}
                nomePoi={ticket.nomePoi}
                nomeEvento={ticket.nomeEvento}
                prezzoTotale={ticket.prezzoTotale}
                dataOra={ticket.dataOra}
              />
            ))}
          </div>

          {expiredTickets.length > 0 ? (
            <div className='mt-3 mb-3 w-100 text-center'>
              <button onClick={toggleExpired} className="btn btn-secondary">{showExpired ? "Nascondi" : "Mostra"} biglietti scaduti</button>
            </div>
          ) : null}

          {showExpired ? (
            <div className="mt-3 row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
              {expiredTickets.map((ticket) => (
                <Ticket
                  key={ticket.id}
                  id={ticket.id}
                  nomePoi={ticket.nomePoi}
                  nomeEvento={ticket.nomeEvento}
                  prezzoTotale={ticket.prezzoTotale}
                  dataOra={ticket.dataOra}
                />
              ))}
            </div>
          ) : null}
        </>
      )}

    </div>
  );
}