import Event from '../components/Event';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getTodayTimestamp } from './Main';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Events() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [shouldReloadEvents, setShouldReloadEvents] = useState(false);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    setShouldReloadEvents(false);

    return onSnapshot(query(collection(db, 'events'), orderBy('dataOra')), (eventsSnap) => {
      const tempEvents = eventsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setEvents(tempEvents.filter(event => event.dataOra.seconds >= getTodayTimestamp()));
      setExpiredEvents(tempEvents.filter(event => event.dataOra.seconds < getTodayTimestamp()).reverse());
      setLoading(false);
    });
  }, [shouldReloadEvents]);

    return loading ? <LoadingSpinner /> : (
      <>
        <div className="container mb-3">
          <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
            {events.map((event) => {
              return (<Event
                key={event.id}
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

          {expiredEvents.length > 0 ? (
            <div className='mt-3 mb-3 w-100 text-center'>
              <button onClick={toggleExpired} className="btn btn-secondary">{showExpired ? "Nascondi" : "Mostra"} eventi passati</button>
            </div>
          ) : null}

          {showExpired ? (
            <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
              {expiredEvents.map((event) => {
                return (<Event
                  key={event.id}
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
          ) : null}
        </div>
      </>
    );
  }