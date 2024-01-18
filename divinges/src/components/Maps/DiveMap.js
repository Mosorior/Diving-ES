// DiveMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa la biblioteca de íconos Leaflet
import data from '../data';
import '../style/DiveMap.css'

// Importa una imagen para el ícono del marcador (ajústala según tus necesidades)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const DiveMap = () => {
  const center = [40.416775, -3.703790]; // Coordenadas de España (Madrid)

  return (
    <MapContainer center={center} zoom={6} style={{ height: '600px', width: '800px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Mapea los puntos de inmersión desde el archivo de datos */}
      {data.map((diveSpot) => (
        <Marker key={diveSpot.id} position={[diveSpot.lat, diveSpot.lng]} icon={customIcon}>
          <Popup>
            <div>
              <h3>{diveSpot.name}</h3>
              <p>{diveSpot.description}</p>

              {/* Muestra secciones adicionales si están presentes */}
              {diveSpot.additionalInfo && diveSpot.additionalInfo.sections && (
                <div>
                  {diveSpot.additionalInfo.sections.map((section, index) => (
                    <div key={index}>
                      {section.type === 'title' && <h4>{section.content}</h4>}
                      {section.type === 'paragraph' && <p>{section.content}</p>}
                      {section.type === 'image' && <img src={section.content} alt={`Image ${index}`} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DiveMap;
