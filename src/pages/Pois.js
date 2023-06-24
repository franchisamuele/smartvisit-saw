import Poi from '../components/Poi';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'
import LoadingSpinner from '../components/LoadingSpinner';

export default function Pois() {
  const [loading, setLoading] = useState(true);
  const [pois, setPois] = useState([]);

  useEffect(() => {
    const getPois = async () => {
      const poisSnap = await getDocs( collection(db, 'poi') );
      setPois(poisSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getPois();
  }, []);

  return loading ? <LoadingSpinner /> : (
    <div className="container mt-1 mb-3">
      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        {pois.map((poi) => {
          return (<Poi
            key={poi.id}
            id={poi.id}
            nome={poi.nome}
            linkImmagine={poi.linkImmagine}
          />);
        })}
      </div>
    </div>
  );
}