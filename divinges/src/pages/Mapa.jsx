// Mapa.jsx
import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import diveSpots from '../data';
import '../styles/Mapa.css';

function Mapa() {
  const [selectedDiveSpot, setSelectedDiveSpot] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // Nuevo estado para controlar si se muestran los detalles

  const handleMarkerClick = (diveSpot) => {
    setSelectedDiveSpot(diveSpot);
    setShowDetails(false); // Reiniciar el estado al seleccionar un nuevo marcador
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Cambiar el estado de mostrar/ocultar detalles
  };

  return (
    <div className="mapa-container">
      <div className="mapa">
        <MapComponent diveSpots={diveSpots} onMarkerClick={handleMarkerClick} showDetails={showDetails} toggleDetails={toggleDetails} />
      </div>
      <div className="info-container">
        {selectedDiveSpot && (
          <div className="dive-spot-info">
            {/* Renderiza la información adicional aquí si showDetails es verdadero */}
            {showDetails && selectedDiveSpot.additionalInfo && (
              <div>
                {selectedDiveSpot.additionalInfo.sections.map((section, index) => {
                  if (section.type === 'title') {
                    return <h2 key={index}>{section.content}</h2>;
                  } else if (section.type === 'image') {
                    return <img key={index} src={section.content} alt={`Imagen ${index}`} />;
                  } else if (section.type === 'paragraph') {
                    return <p key={index}>{section.content}</p>;
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="additional-section">
        <h2>¡Encuentra tu lugar ideal para bucear!</h2>
        <p>
          Con este mapa interactivo, podrás ver todas las zonas de inmersión que existen en España y elegir la que más te guste. Hay que tener en cuenta los requisitos de las inmersiones.
        </p>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} DivingES. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Mapa;
