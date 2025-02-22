import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

export default function LocationControl({ setPosition }) {
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 18);
    }
  });

  function handleButtonClick(e) {
    e.preventDefault();
    map.locate();
  }

  useEffect(() => {
    map.locate();
  }, [map]);

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control-zoom leaflet-bar leaflet-control">
        <a onClick={handleButtonClick} className="leaflet-control-zoom-out d-flex justify-content-center align-items-center" href="#" role="button">
          <i className="material-icons">my_location</i>
        </a>
      </div>
    </div>
  );
}