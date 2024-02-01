import React, { useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../style/Calculadora.css';

const Calculadora = () => {
    const [profundidad, setProfundidad] = useState('');
    const [tiempoFondo, setTiempoFondo] = useState('');
    const [presion, setPresion] = useState('');
    const [planDeBuceo, setPlanDeBuceo] = useState({
        tiempoDescenso: '',
        tiempoFondo: '',
        tiempoAscenso: '',
        requiereDescompresion: false,
        tiempoDescompresion: '',
        profundidadDescompresion: '',
    });
    const [mostrarDisclaimer, setMostrarDisclaimer] = useState(true);
    const [mostrarInfoImportante, setMostrarInfoImportante] = useState(false);


    const toggleMostrarInfo = () => {
        setMostrarInfoImportante(!mostrarInfoImportante);
    };

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
        if (profundidad > 45 || tiempoFondo > 200) {
            setPlanDeBuceo(prevState => ({ ...prevState, mensaje: 'Los valores ingresados no son realistas. Por favor, ajusta la profundidad y/o el tiempo en el fondo.' }));
            return;
        }

        const velocidadDescenso = 18;
        const velocidadAscenso = 9;
        const tiempoDescenso = profundidad / velocidadDescenso;
        const tiempoAscenso = profundidad / velocidadAscenso;

        const rho = 1025;
        const g = 9.81;
        const Patm = 1;
        const P = Patm + (rho * g * profundidad) / 101325;
        setPresion(P.toFixed(2));

        const { requiereDescompresion, tiempoDescompresion, profundidadDescompresion } = calcularTiempoParadaDescompresion(profundidad, tiempoFondo);

        setPlanDeBuceo({
            tiempoDescenso: convertirTiempo(tiempoDescenso),
            tiempoFondo: convertirTiempo(tiempoFondo),
            tiempoAscenso: convertirTiempo(tiempoAscenso),
            requiereDescompresion: requiereDescompresion,
            tiempoDescompresion: convertirTiempo(tiempoDescompresion),
            profundidadDescompresion: profundidadDescompresion,
        });
    };

    const aceptarDisclaimer = () => {
        setMostrarDisclaimer(false);
    };

    const rechazarDisclaimer = () => {
        window.location.href = '/home';
    };

    const convertirTiempo = (tiempoDecimal) => {
        const minutos = Math.floor(tiempoDecimal);
        const segundos = Math.round((tiempoDecimal - minutos) * 60);
        return `${minutos}min${segundos !== 0 ? ` ${segundos}s` : ''}`;
      };
      

    return (
        <div>
            <Navbar />
            <div className="calculadora-container">
                <h2>Calculadora de Buceo</h2>
                <div className='info-important' onClick={() => setMostrarInfoImportante(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <i className="fas fa-exclamation-triangle icono-advertencia"></i>
                    <span>Información Importante</span>
                </div>
                {mostrarInfoImportante && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Información Importante</h3>
                            <p>Los cálculos proporcionados por esta herramienta son aproximados y se basan en los siguientes valores y suposiciones:</p>
                            <div className="info-grid">
                                <div>
                                    <p>Velocidad de descenso: 18 metros por minuto.</p>
                                    <p>Velocidad de ascenso: 9 metros por minuto.</p>
                                    <p>Tabla de No Descompresión (ND) para calcular la necesidad de paradas de descompresión.</p>
                                </div>
                                <div>
                                    <p>Tiempo de parada de descompresión estimado: 5 minutos a una profundidad de 5 metros (cuando se requiere).</p>
                                    <p>Los cálculos de presión asumen una densidad del agua de mar de 1025 kg/m³ y una aceleración debido a la gravedad de 9.81 m/s².</p>
                                </div>
                            </div>
                            <p>Además, se recomienda planificar el consumo de aire/gas de manera conservadora y llevar siempre una reserva adicional de aire/gas más allá del cálculo realizado.</p>
                            <button onClick={() => setMostrarInfoImportante(false)}>Cerrar</button>
                        </div>
                    </div>
                )}
            
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
                    <input type="number" id="profundidad" value={profundidad} onChange={(e) => setProfundidad(Number(e.target.value))} placeholder="Ej. 30"/>
                </div>
                <div>
                    <label htmlFor="tiempoFondo">Tiempo en el fondo (minutos):</label>
                    <input type="number" id="tiempoFondo" value={tiempoFondo} onChange={(e) => setTiempoFondo(Number(e.target.value))} placeholder="Ej. 20"/>
                </div>
                <button onClick={calcularPresionYBuceo}>Calcular Planificación</button>
                {presion && <p>Presión Requerida: <b>{presion} atm</b></p>}
                {planDeBuceo.tiempoDescenso && (
                    <div className='resultados'>
                        <h3>Plan de Buceo:</h3>
                        <p>Tiempo de descenso: {planDeBuceo.tiempoDescenso}</p>
                        <p>Tiempo en el fondo: {planDeBuceo.tiempoFondo}</p>
                        <p>Tiempo de ascenso: {planDeBuceo.tiempoAscenso}</p>
                        {planDeBuceo.requiereDescompresion && (
                            <p>Tiempo de parada de descompresión: {planDeBuceo.tiempoDescompresion} a una profundidad de {planDeBuceo.profundidadDescompresion} metros</p>
                        )}
                        {!planDeBuceo.requiereDescompresion && <p>No se requiere parada de descompresión.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculadora;            