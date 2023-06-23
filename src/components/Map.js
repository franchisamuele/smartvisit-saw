import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet'
import LocationMarker from './LocationMarker'
import LocationControl from './LocationControl'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const placeholderIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});
const myPositionIcon = new Icon({
  iconUrl: require('../images/myPosition.png'),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [20, 40]
});

export default function Map() {
  const [position, setPosition] = useState(null);
  const [pois, setPois] = useState([]);
  const { poiIndex } = useParams();

  const map = useMap();

  useEffect(() => {
    const docRef = collection(db, 'poi');

    const getPois = async () => {

      const docSnap = await getDocs(docRef);
      setPois(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };

    getPois();
  }, []);

  useEffect(() => {
    if (poiIndex !== undefined && pois.length > 0) {
      const target = pois.find(poi => poiIndex === poi.id);

      if (target) {
        map.flyTo({ lat: target.latitudine, lng: target.longitudine }, 18);
      }
    }
  }, [pois, poiIndex, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        pois.map((poi) => {
          return (
            <Marker key={poi.id} position={[poi.latitudine, poi.longitudine]} icon={placeholderIcon}>
              <Popup>
                <Link to={"/pointsOfInterest/" + poi.id}>{poi.nome}</Link>
              </Popup>
            </Marker>
          );
        })
      }

      {/* User potition */}
      <LocationMarker
        icon={myPositionIcon}
        position={position}
      />

      <LocationControl setPosition={setPosition} />
    </>
  );
}