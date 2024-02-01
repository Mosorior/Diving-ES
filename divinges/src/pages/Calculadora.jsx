import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';

const Calculadora = () => {
    const [profundidad, setProfundidad] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [presion, setPresion] = useState(0);

    const calcularPresion = () => {
        // Asumiendo una densidad del agua de mar de 1025 kg/m³ y gravedad de 9.81 m/s²
        // La presión atmosférica al nivel del mar es aproximadamente 1 atmósfera (atm)
        const rho = 1025; // densidad del agua de mar
        const g = 9.81; // aceleración debido a la gravedad
        const Patm = 1; // presión atmosférica en atm
        const h = profundidad; // profundidad en metros
        const P = Patm + (rho * g * h) / 101325; // presión en atm
        setPresion(P.toFixed(2));
    };

    return (
        <div>
            <Navbar />
            <h2>Calculadora de Buceo</h2>
            <div>
                <label htmlFor="profundidad">Profundidad (metros):</label>
                <input
                    type="number"
                    id="profundidad"
                    value={profundidad}
                    onChange={(e) => setProfundidad(e.target.value)}
                    placeholder="Ej. 30"
                />
            </div>
            <div>
                <label htmlFor="tiempo">Tiempo (minutos):</label>
                <input
                    type="number"
                    id="tiempo"
                    value={tiempo}
                    onChange={(e) => setTiempo(e.target.value)}
                    placeholder="Ej. 50"
                />
            </div>
            <button onClick={calcularPresion}>Calcular Planificación</button>
        </div>
    );
};

export default Calculadora;
