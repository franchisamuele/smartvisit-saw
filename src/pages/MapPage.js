import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import Map from '../components/Map'
import FallbackPage from './FallbackPage'
import { useEffect, useState } from "react";

export default function MapPage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, [navigator.onLine]);

  return !isOnline ? <FallbackPage /> : (
    <MapContainer
      style={{ height: "calc(100vh - 56px)" }}
      center={[43.719, 10.401510]}
      zoom={15}
    >
      <Map />
    </MapContainer>
  );
}