import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import Map from '../components/Map'

export default function MapPage() {
  return (
    <MapContainer
      style={{ height: "calc(100vh - 56px)" }}
      center={[41.870139, 13.045694]}
      zoom={6}
    >
      <Map />
    </MapContainer>
  );
}