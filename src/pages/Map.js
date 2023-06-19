import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Icon } from 'leaflet'

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
  return (
    <MapContainer style={{ height: "calc(100vh - 56px)" }} center={[48.8566, 2.3522]} zoom={18}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.8566, 2.3522]} icon={myPositionIcon} />
      <Circle
        center={{ lat: 48.8566, lng: 2.3522 }}
        color={'#4287f5'}
        fillColor={'#4287f5'}
        fillOpacity={0.1}
        radius={100}
      />
      
      <Marker position={[48.8666, 2.3522]} icon={placeholderIcon}>
        <Popup>This is a popup</Popup>
      </Marker>
    </MapContainer>
  );
}