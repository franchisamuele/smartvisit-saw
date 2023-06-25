import Poi from '../components/Poi';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

export default function Pois() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pois, setPois] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, 'poi'), (poisSnap) => {
      const pois = poisSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setPois(pois);
      setLoading(false);
    });
  }, []);

  return loading ? <LoadingSpinner /> : (
    <>
      <div className="container mt-1 mb-3">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
          {pois
            .filter(poi => !search || poi.nome.toLowerCase().includes(search.toLowerCase()))
            .map((poi) => {
              return (<Poi
                key={poi.id}
                id={poi.id}
                nome={poi.nome}
                linkImmagine={poi.linkImmagine}
              />);
            })}
        </div>
      </div>
    </>
  );
}