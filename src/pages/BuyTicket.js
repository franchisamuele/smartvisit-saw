import PoiTicket from '../components/PoiTicket'
import EventTicket from '../components/EventTicket'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner'

export default function BuyTicket() {
  const { ticketType, index } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  var docRef = null;
  if (ticketType === 'P') { // POI
    docRef = doc(db, 'poi', index);
  } else if (ticketType === 'E') { // EVENT 
    docRef = doc(db, 'events', index);
  } else {
    navigate('/NoPage');
  }

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({ ...docSnap.data(), id: docSnap.id });
      } else {
        navigate('/NoPage');
      }
    };
    
    if (ticketType !== 'P' && ticketType !== 'E')
      navigate('/NoPage');
    else
      getData();
  }, [docRef]);

  return (
    ticketType === 'P' ? (
      data ? <PoiTicket data={data} /> : <LoadingSpinner />
    ) : 
    ticketType === 'E' ? (
      data ? <EventTicket data={data} /> : <LoadingSpinner />
    ) :
    console.log(index, ticketType)
    //navigate('/NoPage')
  );
}