// DiveSpotDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import diveSpots from '../data'; // Importa tu lista de lugares de inmersión

function DiveSpotDetails() {
  const { id } = useParams();

  // Busca el lugar de inmersión por su ID
  const diveSpot = diveSpots.find((spot) => spot.id === parseInt(id, 10));

  if (!diveSpot) {
    return <p>Lugar de inmersión no encontrado.</p>;
  }

  return (
    <div className="dive-spot-info">
      <h2>{diveSpot.name}</h2>
      <p>{diveSpot.description}</p>
      {/* Renderiza la información adicional aquí */}
      {diveSpot.additionalInfo && (
        <div>
          {diveSpot.additionalInfo.sections.map((section, index) => {
            if (section.type === 'title') {
              return <h3 key={index}>{section.content}</h3>;
            } else if (section.type === 'image') {
              return <img key={index} src={section.content} alt={`Imagen ${index}`} />;
            } else if (section.type === 'paragraph') {
              return <p key={index}>{section.content}</p>;
            }
            return null; // Manejar otros tipos de secciones según sea necesario
          })}
        </div>
      )}
    </div>
  );
}

export default DiveSpotDetails;
