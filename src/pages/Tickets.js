import Ticket from '../components/Ticket';
import PannelloAmministratore from '../components/PannelloAmministratore';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth } from '../firebaseConfig';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  const docRef = query(collection(db, 'tickets'), where('uid', '==', auth.currentUser.uid));

  const sortDate = (a, b) => {
    return b.data.seconds - a.data.seconds;
  };

  useEffect(() => {
    const getTickets = async () => {

      const docSnap = await getDocs(docRef);
      setTickets((docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).sort(sortDate));

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
          <PannelloAmministratore />
        </div>
      </div>
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