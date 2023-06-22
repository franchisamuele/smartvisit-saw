import Event from '../components/Event';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore'
import { getTodayTimestamp } from './Main';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [shouldReloadEvents, setShouldReloadEvents] = useState(false);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    setShouldReloadEvents(false);

    const getEvents = async () => {
      const eventsSnap = await getDocs( query(collection(db, 'events'), orderBy('dataOra')) );
      const tempEvents = eventsSnap.docs.map(doc => ({...doc.data(), id: doc.id}));

      for (let event of tempEvents) {
        const eventFoundSnap = await getDoc(doc(db, 'poi', event.idPoi));
        event.nomePoi = eventFoundSnap.exists() ? eventFoundSnap.data().nome : "Poi non trovato";
      }

      setEvents( tempEvents.filter(event => event.dataOra.seconds >= getTodayTimestamp()) );
      setExpiredEvents( tempEvents.filter(event => event.dataOra.seconds < getTodayTimestamp()).reverse() );
    };

    getEvents();
  }, [shouldReloadEvents]);

  return (
    <>
      <div className="container mt-1 mb-3">
        <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
          {events.map((event) => {
            return (<Event
              id={event.id}
              nome={event.nome}
              nomePoi={event.nomePoi}
              dataOra={event.dataOra}
              linkImmagine={event.linkImmagine}
              setShouldReloadEvents={setShouldReloadEvents}
              expired={false}
            />);
          })}
        </div>
      </div>

      {expiredEvents.length > 0 ? (
        <div className='w-100 text-center'>
          <button onClick={toggleExpired} className="btn btn-secondary">{showExpired ? "Nascondi" : "Mostra"} eventi passati</button>
        </div>
      ) : null}

      {showExpired ? (
        <div className="container mt-1 mb-3">
          <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
            {expiredEvents.map((event) => {
              return (<Event
                id={event.id}
                nome={event.nome}
                nomePoi={event.nomePoi}
                dataOra={event.dataOra}
                linkImmagine={event.linkImmagine}
                setShouldReloadEvents={setShouldReloadEvents}
                expired={true}
              />);
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}