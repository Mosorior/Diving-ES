import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import '../style/Calculadora.css';

const Calculadora = () => {
    const [profundidad, setProfundidad] = useState(0);
    const [tiempoFondo, setTiempoFondo] = useState(0);
    const [presion, setPresion] = useState(0);
    const [planBuceo, setPlanBuceo] = useState('');
    const [mostrarDisclaimer, setMostrarDisclaimer] = useState(true); // Estado para controlar la visualización del modal

    const calcularTiempoParadaDescompresion = (profundidad, tiempoFondo) => {
        const tablaND = {
            12: 200, 15: 100, 18: 60, 21: 50, 24: 40, 27: 30, 30: 25, 33: 20, 36: 15, 39: 10, 42: 10, 45: 5
        };
        let ndl = null;
        for (let depth in tablaND) {
            if (parseInt(depth) >= profundidad) {
                ndl = tablaND[depth];
                break;
            }
        }
        const requiereDescompresion = ndl !== null && tiempoFondo > ndl;
        const tiempoDescompresion = requiereDescompresion ? 5 : 0;
        const profundidadDescompresion = requiereDescompresion ? 5 : null;
        return { requiereDescompresion, tiempoDescompresion, profundidadDescompresion };
    };

    const calcularPresionYBuceo = () => {
        if (profundidad > 45 || tiempoFondo > 200 || profundidad < 12) {
            setPlanBuceo('Los valores ingresados no son realistas. Por favor, ajusta la profundidad y/o el tiempo en el fondo.');
            return;
        }

        // Cálculo del tiempo de descenso y ascenso
        const velocidadDescenso = 18;
        const velocidadAscenso = 9;
        const tiempoDescenso = profundidad / velocidadDescenso;
        const tiempoAscenso = profundidad / velocidadAscenso;

        // Cálculo de la presión
        const rho = 1025;
        const g = 9.81;
        const Patm = 1;
        const P = Patm + (rho * g * profundidad) / 101325;
        setPresion(P.toFixed(2));

        // Cálculo de la parada de descompresión
        const { requiereDescompresion, tiempoDescompresion, profundidadDescompresion } = calcularTiempoParadaDescompresion(profundidad, tiempoFondo);

        // Plan de buceo
        setPlanBuceo(`
            Tiempo de descenso: ${tiempoDescenso.toFixed(2)} minutos
            Tiempo en el fondo: ${tiempoFondo.toFixed(2)} minutos
            Tiempo de ascenso: ${tiempoAscenso.toFixed(2)} minutos
            ${requiereDescompresion ? `Tiempo de parada de descompresión: ${tiempoDescompresion.toFixed(2)} minutos a una profundidad de ${profundidadDescompresion} metros` : 'No se requiere parada de descompresión.'}
        `);
    };

    const aceptarDisclaimer = () => {
        setMostrarDisclaimer(false);
    };

    const rechazarDisclaimer = () => {
        window.location.href = '/'; // Redirige a la página de inicio
    };

    return (
        <div>
            <Navbar />
            <h2>Calculadora de Buceo</h2>

            {mostrarDisclaimer && (
                <div className="modal">
                    <div className="modal-content">
                    <h3>Descargo de Responsabilidad</h3>
                    <p>Esta herramienta de cálculo de buceo se proporciona "tal cual" y es solo para fines informativos. Los resultados son estimaciones y pueden no ser precisos para todas las situaciones de buceo. El creador de esta herramienta no garantiza la exactitud, adecuación o integridad de la información y materiales proporcionados y expresamente se exime de responsabilidad por errores u omisiones en estos materiales.</p>
                <p>El uso de esta herramienta no reemplaza la capacitación profesional de buceo, el asesoramiento de expertos, o el uso de un ordenador de buceo certificado. Los usuarios son responsables de su propia seguridad y deben tomar todas las precauciones necesarias al planificar y realizar inmersiones. El creador de esta herramienta no será responsable de ninguna lesión, pérdida, daño o accidente que pueda resultar del uso o confianza en la información proporcionada por esta herramienta.</p>
                <p>Al utilizar esta herramienta, usted reconoce y acepta que el buceo conlleva riesgos inherentes y que es responsable de tomar decisiones informadas y seguras en relación con sus actividades de buceo.</p>
                    <button onClick={aceptarDisclaimer}>Aceptar</button>
                    <button onClick={rechazarDisclaimer}>Rechazar</button>
                </div>
                </div>
            )}
            <div>
                <label htmlFor="profundidad">Profundidad (metros):</label>
                <input
                    type="number"
                    id="profundidad"
                    value={profundidad}
                    onChange={(e) => setProfundidad(Number(e.target.value))}
                    placeholder="Ej. 30"
                />
            </div>
            <div>
                <label htmlFor="tiempoFondo">Tiempo en el fondo (minutos):</label>
                <input
                    type="number"
                    id="tiempoFondo"
                    value={tiempoFondo}
                    onChange={(e) => setTiempoFondo(Number(e.target.value))}
                    placeholder="Ej. 20"
                />
            </div>
            <button onClick={calcularPresionYBuceo}>Calcular Planificación</button>
            {presion && <p>Presión Requerida: {presion} atm</p>}
            {planBuceo && <div><h3>Plan de Buceo:</h3><p>{planBuceo}</p></div>}

            <div className="info-seccion">
                <h3>Información Importante</h3>
                <p>Los cálculos proporcionados por esta herramienta son aproximados y se basan en los siguientes valores y suposiciones:</p>
                <ul>
                    <li>Velocidad de descenso: 18 metros por minuto.</li>
                    <li>Velocidad de ascenso: 9 metros por minuto.</li>
                    <li>Tabla de No Descompresión (ND) para calcular la necesidad de paradas de descompresión.</li>
                    <li>Tiempo de parada de descompresión estimado: 5 minutos a una profundidad de 5 metros (cuando se requiere).</li>
                    <li>Los cálculos de presión asumen una densidad del agua de mar de 1025 kg/m³ y una aceleración debido a la gravedad de 9.81 m/s².</li>
                </ul>
                 <p>Además, se recomienda planificar el consumo de aire/gas de manera conservadora y llevar siempre una reserva adicional de aire/gas más allá del cálculo realizado. Las condiciones bajo el agua pueden cambiar y es posible que se consuma más aire de lo previsto. Siempre es mejor tener una cantidad de gas en reserva para emergencias.</p>
                <p>Es importante recordar que estos cálculos no deben usarse para la planificación real de inmersiones. Siempre consulte a un profesional y utilice un ordenador de buceo para la planificación detallada de sus inmersiones.</p>
            </div>
        </div>
    );
};

export default Calculadora;
