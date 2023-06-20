import Poi from '../components/Poi';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'

export default function Pois() {
  const [pois, setPois] = useState([]);

  const docRef = collection(db, 'poi');

  useEffect(() => {
    const getPois = async () => {

      const docSnap = await getDocs(docRef);
      setPois(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };

    getPois();
  }, [docRef]);

  return (
    <div className="container mt-1 mb-3">
      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        {pois.map((poi) => {
          return (<Poi
            id={poi.id}
            nome={poi.nome}
            linkImmagine={poi.linkImmagine}
          />);
        })}
      </div>
    </div>
  );
}