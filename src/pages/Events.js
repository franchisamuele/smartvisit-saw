import Event from '../components/Event';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const docRef = collection(db, 'events');

  useEffect(() => {
    const getEvents = async () => {

      const docSnap = await getDocs(docRef);
      setEvents(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };
    
    getEvents();
  }, [docRef]);

  return (
    <div className="container mt-1 mb-3">
      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        {events.map((event) => {
          return (<Event
            id={event.id}
            nome={event.nome}
            nomePoi={event.nomePoi}
            linkImmagine={event.linkImmagine}
          />);
        })}
      </div>
    </div>
  );
}