import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';

const Calculadora = () => {
    const [profundidad, setProfundidad] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [presion, setPresion] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [planBuceo, setPlanBuceo] = useState('');

    const calcularPresionYBuceo = () => {
        // Validación de valores realistas
        if (profundidad > 40 || tiempo > 60) {
            setMensaje('Los valores ingresados no son realistas. Por favor, ajusta la profundidad y/o el tiempo.');
            return;
        }

        // Cálculo de la presión
        const rho = 1025; // densidad del agua de mar
        const g = 9.81; // aceleración debido a la gravedad
        const Patm = 1; // presión atmosférica en atm
        const h = profundidad; // profundidad en metros
        const P = Patm + (rho * g * h) / 101325; // presión en atm
        setPresion(P.toFixed(2));

        // Implementación simplificada de las tablas de buceo de PADI
        let tiempoMaximoSinDescompresion; // Determinar basado en la profundidad
        let requiereDescompresion = false;
        let profundidadDescompresion = 5; // Profundidad estándar de descompresión en metros
        let tiempoDescompresion = 5; // Ejemplo de tiempo de descompresión

        // Lógica para establecer el NDL basada en la profundidad
        if (profundidad <= 18) {
            tiempoMaximoSinDescompresion = 60; // Ejemplo para 18 metros
        } else if (profundidad <= 30) {
            tiempoMaximoSinDescompresion = 20; // Ejemplo para 30 metros
        } else if (profundidad <= 40) {
            tiempoMaximoSinDescompresion = 8; // Ejemplo para 40 metros
        } else {
            tiempoMaximoSinDescompresion = 0; // Fuera del rango de buceo recreativo
        }

        // Verificar si se requiere parada de descompresión
        if (tiempo > tiempoMaximoSinDescompresion) {
            requiereDescompresion = true;
        }

        // Mensaje de resultado
        if (requiereDescompresion) {
            setMensaje(`Se requiere parada de descompresión de ${tiempoDescompresion} minutos a una profundidad de ${profundidadDescompresion} metros.`);
        } else {
            setMensaje('No se requiere parada de descompresión. Buceo seguro.');
        }
        planificarBuceo(requiereDescompresion, tiempoDescompresion);
    };

    const planificarBuceo = (requiereDescompresion, tiempoDescompresion) => {
        const velocidadDescenso = 18; // metros por minuto
        const velocidadAscenso = 9; // metros por minuto
        const tiempoDescenso = profundidad / velocidadDescenso;
        const tiempoAscenso = profundidad / velocidadAscenso;
        const tiempoParadaDescompresion = requiereDescompresion ? tiempoDescompresion : 0;
        const tiempoTotal = tiempoDescenso + tiempo + tiempoAscenso + tiempoParadaDescompresion;

        setPlanBuceo(`
            Tiempo de descenso: ${tiempoDescenso.toFixed(2)} minutos
            Tiempo en profundidad: ${tiempo.toFixed(2)} minutos
            Tiempo de ascenso: ${tiempoAscenso.toFixed(2)} minutos
            Tiempo de parada de descompresión: ${tiempoParadaDescompresion.toFixed(2)} minutos
            Tiempo total de la inmersión: ${tiempoTotal.toFixed(2)} minutos
        `);
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
            <button onClick={calcularPresionYBuceo}>Calcular Planificación</button>
            {presion && <p>Presión Requerida: {presion} atm</p>}
            {mensaje && <p>{mensaje}</p>}
            {planBuceo && <div><h3>Plan de Buceo:</h3><p>{planBuceo}</p></div>}
        </div>
    );
};

export default Calculadora;
