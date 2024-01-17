import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import data from './data';

const Mapa = () => {
  const defaultCenter = [40.7128, -74.006];
  const defaultZoom = 10;

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Mapa;
