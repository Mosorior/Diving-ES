// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa la biblioteca de íconos Leaflet
import 'leaflet/dist/leaflet.css';
import '../../style/MapComponent.css';

// Importa una imagen para el ícono del marcador (ajústala según tus necesidades)
import markerIcon from 'leaflet/dist/images/marker-icon.png';

// Crea un ícono personalizado con Leaflet
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapComponent({ diveSpots, onMarkerClick, showDetails, toggleDetails }) {
  return (
    <div className='leaflet-container'>
      <MapContainer center={[40.416770, -3.703553]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {diveSpots.map((diveSpot) => (
          <Marker
            key={diveSpot.id}
            position={[diveSpot.lat, diveSpot.lng]}
            onClick={() => onMarkerClick(diveSpot)}
            icon={customIcon} // Utiliza el ícono personalizado
          >
            <Popup>
              <div>
                <h2 className='diveSpotName'>{diveSpot.name}</h2>
                <p>{diveSpot.description}</p>
                {/* Cambia el texto del botón y maneja su clic */}
                {/*<button onClick={() => { onMarkerClick(diveSpot); toggleDetails(); }}>
                  {showDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
        </button>*/}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
