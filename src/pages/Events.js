import Event from '../components/Event';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc, query, where, Timestamp } from 'firebase/firestore'

export default function Events() {
  const [events, setEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [shouldReloadEvents, setShouldReloadEvents] = useState(false);

  const [showExpired, setShowExpired] = useState(false);
  function toggleExpired() {
    setShowExpired(!showExpired);
  };

  async function getNomePoi(idPoi) {
    var nomePoi = "Poi non trovato";
    const poiSnap = await getDoc(doc(db, 'poi', idPoi));
    if (poiSnap.exists())
      nomePoi = poiSnap.data().nome;

    return nomePoi;
  }

  const descendingSortDate = (a, b) => {
    return a.dataOra.seconds - b.dataOra.seconds;
  };
  const ascendingSortDate = (a, b) => {
    return b.dataOra.seconds - a.dataOra.seconds;
  };

  useEffect(() => {
    setShouldReloadEvents(false);

    const currentDate = new Date();

    async function getSetEvents() {
      const docRef = query(collection(db, 'events'), where('dataOra', '>=', currentDate));
      const docSnap = await getDocs(docRef);

      const eventPromises = docSnap.docs.map(async (doc) => {
        const nomePoi = await getNomePoi(doc.data().idPoi);
        return { ...doc.data(), id: doc.id, nomePoi };
      });

      const resolvedEvents = await Promise.all(eventPromises);
      setEvents(resolvedEvents.sort(descendingSortDate));
    }

    async function getSetExpiredEvents() {
      const docRef = query(collection(db, 'events'), where('dataOra', '<', currentDate));
      const docSnap = await getDocs(docRef);

      const eventPromises = docSnap.docs.map(async (doc) => {
        const nomePoi = await getNomePoi(doc.data().idPoi);
        return { ...doc.data(), id: doc.id, nomePoi };
      });

      const resolvedEvents = await Promise.all(eventPromises);
      setExpiredEvents(resolvedEvents.sort(ascendingSortDate));
    }

    const getEvents = async () => {
      getSetEvents();
      getSetExpiredEvents();
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