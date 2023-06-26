import { Circle, Marker } from "react-leaflet";

export default function LocationMarker({ icon, position }) {
  return <>
    {position && (
      <Marker position={position} icon={icon}>
        <Circle
          center={position}
          color={'#4287f5'}
          fillColor={'#4287f5'}
          fillOpacity={0.1}
          radius={100}
        />
      </Marker>
    )}
  </>
}