import PoiTicket from '../components/PoiTicket'
import EventTicket from '../components/EventTicket'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'
import NoPage from './NoPage';

export default function BuyTicket() {
  const { ticketType, index } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    var docRef = null;
    if (ticketType === 'P') { // POI
      docRef = doc(db, 'poi', index);
    } else if (ticketType === 'E') { // EVENT 
      docRef = doc(db, 'events', index);
    } else {
      navigate('/NoPage');
    }

    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...docSnap.data(), id: docSnap.id });
      } else {
        navigate('/NoPage');
      }
    });
  }, []);

  return (
    ticketType === 'P' ? (
      data ? <PoiTicket data={data} /> : <LoadingSpinner />
    ) :
      ticketType === 'E' ? (
        data ? <EventTicket data={data} /> : <LoadingSpinner />
      ) : <NoPage />
  );
}