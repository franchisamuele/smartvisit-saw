import Event from '../components/Event';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getTodayTimestamp } from './Main';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

export default function Events() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => !search || event.nome.toLowerCase().includes(search.toLowerCase()) || event.nomePoi.toLowerCase().includes(search.toLowerCase()))
  }, [events, search]);

  const filteredExpiredEvents = useMemo(() => {
    return expiredEvents.filter(event => !search || event.nome.toLowerCase().includes(search.toLowerCase()) || event.nomePoi.toLowerCase().includes(search.toLowerCase()))
  }, [expiredEvents, search]);

  useEffect(() => {
    return onSnapshot(query(collection(db, 'events'), orderBy('dataOra')), (eventsSnap) => {
      const tempEvents = eventsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setEvents(tempEvents.filter(event => event.dataOra.seconds >= getTodayTimestamp()));
      setExpiredEvents(tempEvents.filter(event => event.dataOra.seconds < getTodayTimestamp()).reverse());
      setLoading(false);
    });
  }, []);

  return loading ? <LoadingSpinner /> : (
    <>
      <div className="container mb-3">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
          {filteredEvents
            .map((event) => {
              return (<Event
                key={event.id}
                id={event.id}
                nome={event.nome}
                nomePoi={event.nomePoi}
                dataOra={event.dataOra}
                linkImmagine={event.linkImmagine}
                expired={false}
              />);
            })}
        </div>

        {filteredExpiredEvents.length > 0 ? (
          <div className='mt-3 mb-3 w-100 text-center'>
            <button onClick={toggleExpired} className="btn btn-secondary">{showExpired ? "Nascondi" : "Mostra"} eventi passati</button>
          </div>
        ) : null}

        {showExpired ? (
          <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
            {filteredExpiredEvents
              .map((event) => {
                return (<Event
                  key={event.id}
                  id={event.id}
                  nome={event.nome}
                  nomePoi={event.nomePoi}
                  dataOra={event.dataOra}
                  linkImmagine={event.linkImmagine}
                  expired={true}
                />);
              })}
          </div>
        ) : null}
      </div>
    </>
  );
}