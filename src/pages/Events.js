import Event from '../components/Event';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

export default function Events() {
  const [events, setEvents] = useState([]);
  const [shouldReloadEvents, setShouldReloadEvents] = useState(false);

  async function getNomePoi(idPoi) {
    var nomePoi = "Poi non trovato";
    const poiSnap = await getDoc(doc(db, 'poi', idPoi));
    if (poiSnap.exists())
      nomePoi = poiSnap.data().nome;

    return nomePoi;
  }

  useEffect(() => {
    setShouldReloadEvents(false);

    const docRef = collection(db, 'events');

    const getEvents = async () => {

      const docSnap = await getDocs(docRef);

      const eventPromises = docSnap.docs.map(async (doc) => {
        const nomePoi = await getNomePoi(doc.data().idPoi);
        return { ...doc.data(), id: doc.id, nomePoi };
      });
  
      const resolvedEvents = await Promise.all(eventPromises);
      setEvents(resolvedEvents);

    };

    getEvents();
  }, [shouldReloadEvents]);

  return (
    <div className="container mt-1 mb-3">
      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        {events.map((event) => {
          return (<Event
            id={event.id}
            nome={event.nome}
            nomePoi={event.nomePoi}
            linkImmagine={event.linkImmagine}
            setShouldReloadEvents={setShouldReloadEvents}
          />);
        })}
      </div>
    </div>
  );
}