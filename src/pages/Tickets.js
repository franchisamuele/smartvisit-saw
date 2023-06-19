import Ticket from '../components/Ticket';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  
  const docRef = collection(db, 'tickets');

  useEffect(() => {
    const getTickets = async () => {

      const docSnap = await getDocs(docRef);
      setTickets(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };
    
    getTickets();
  }, []);
  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-1 text-center">I MIEI BIGLIETTI</h1>
      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        {tickets.map((ticket) => {
          return (<Ticket
            id={ticket.id}
            nomePoi={ticket.nomePoi}
            nomeEvento={ticket.nomeEvento}
            prezzoTotale={ticket.prezzoTotale}
            data={ticket.data}
          />);
        })}
      </div>
    </div>
  );
}