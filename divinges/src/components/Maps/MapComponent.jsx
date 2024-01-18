// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/MapComponent.css';

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
          >
            <Popup>
              <div>
                <h2>{diveSpot.name}</h2>
                <p>{diveSpot.description}</p>
                {/* Cambia el texto del botón y maneja su clic */}
                <button onClick={() => { onMarkerClick(diveSpot); toggleDetails(); }}>
                  {showDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
