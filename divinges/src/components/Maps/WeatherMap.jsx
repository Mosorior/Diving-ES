import React, { useEffect } from 'react';
import { Map, TileLayer } from 'react-windy-leaflet';
import L from 'leaflet';

function WeatherMap() {
  useEffect(() => {
    const options = {
      key: 'ssOiQ1yLWktWQkV8HCst12oG86SEP2IS', // Reemplaza con tu API key
      lat: 40.416775,
      lon: -3.703790,
      zoom: 5,
    };

    const windyInitCallback = (windyAPI) => {
      const { store } = windyAPI;

      // Cambia la capa base a la de temperaturas
      store.set('overlay', 'temp');
    };
    //eslint-disable-next-line
    windyInit(options, windyInitCallback);
  }, []);

  return (
    <div>
      <div id="windy" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default WeatherMap;
