import Ticket from '../components/Ticket';
import PannelloAmministratore from '../components/PannelloAmministratore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../firebaseConfig';
import { GlobalStateContext } from '../App';

export default function Tickets() {
  const { globalState } = useContext(GlobalStateContext);
  const [tickets, setTickets] = useState([]);
  const [expiredTickets, setExpiredTickets] = useState([]);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  const descendingSortDate = (a, b) => {
    return a.data.seconds - b.data.seconds;
  };
  const ascendingSortDate = (a, b) => {
    return b.data.seconds - a.data.seconds;
  };

  useEffect(() => {
    const docRef = query(collection(db, 'tickets'), where('uid', '==', auth.currentUser.uid));

    const getTickets = async () => {
      const ticketsTemp = [];
      const expiredTicketsTemp = [];

      const docSnap = await getDocs(docRef);

      const promises = docSnap.docs.map(async (docum) => {
        const poiTrovato = await getDoc(doc(db, 'poi', docum.data().idPoi));
        const nomePoi = poiTrovato.exists() ? poiTrovato.data().nome : "Poi non trovato";
  
        const isEvent = docum.data().idEvento;
        let nomeEvento = null;
        if (isEvent) {
          const eventoTrovato = await getDoc(doc(db, 'events', docum.data().idEvento));
          nomeEvento = eventoTrovato.exists() ? eventoTrovato.data().nome : "Evento non trovato";
        }
  
        const currTicket = { ...docum.data(), id: docum.id, nomePoi, ...(isEvent && { nomeEvento }) };
  
        const currTimestamp = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
        if (currTimestamp < currTicket.data.seconds)
          ticketsTemp.push(currTicket);
        else
          expiredTicketsTemp.push(currTicket);
      });
  
      await Promise.all(promises);

      setTickets(ticketsTemp.sort(descendingSortDate));
      setExpiredTickets(expiredTicketsTemp.sort(ascendingSortDate));
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
            data={ticket.data}
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
              data={ticket.data}
            />
          ))}
        </div>
      ) : null}

    </div>
  );
}