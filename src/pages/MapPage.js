import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import Map from '../components/Map'

export default function MapPage() {
  return (
    <MapContainer
      style={{ height: "calc(100vh - 56px)" }}
      center={[43.719, 10.401510]}
      zoom={15}
    >
      <Map />
    </MapContainer>
  );
}