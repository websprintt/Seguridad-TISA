import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  ChevronUp,
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShoppingCart,
  Award,
  Lock
} from 'lucide-react';
import ShareButtons from './ShareButtons';
import { solutionCategories } from '../data/solutions';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    recommendationId?: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿De qué tipo es tu vivienda principal?",
    options: [
      { text: "Piso en bloque de vecinos", score: 10 },
      { text: "Chalet / Casa independiente", score: 5 },
      { text: "Bajo o 1ª planta con terraza", score: 3 },
      { text: "Nave o Negocio", score: 5 }
    ]
  },
  {
    id: 2,
    text: "¿Tienes algún sistema de alarma activo ahora mismo?",
    options: [
      { text: "Sí, conectada a central de policía", score: 20 },
      { text: "Sí, pero es sonora (sin aviso a policía)", score: 10, recommendationId: "alarma" },
      { text: "No tengo alarma", score: 0, recommendationId: "alarma" },
      { text: "Tuve una pero la quité", score: 0, recommendationId: "alarma" }
    ]
  },
  {
    id: 3,
    text: "¿Dispones de cámaras de videovigilancia?",
    options: [
      { text: "Sí, con grabación 24/7 y acceso móvil", score: 15 },
      { text: "Sí, pero son cámaras básicas/antiguas", score: 8, recommendationId: "cctv" },
      { text: "Solo una para la entrada", score: 5, recommendationId: "cctv" },
      { text: "No tengo ninguna cámara", score: 0, recommendationId: "cctv" }
    ]
  },
  {
    id: 4,
    text: "¿Cómo son los accesos principales (puertas/ventanas)?",
    options: [
      { text: "Blindada con sensores de apertura", score: 15 },
      { text: "Puerta normal sin sensores", score: 5, recommendationId: "sensores" },
      { text: "Vivienda con muchas ventanas accesibles", score: 2, recommendationId: "sensores" },
      { text: "Puerta con cerradura antigua sencilla", score: 0, recommendationId: "nuki" }
    ]
  },
  {
    id: 5,
    text: "¿Sueles pasar temporadas fuera o viajar mucho?",
    options: [
      { text: "No, la casa suele estar ocupada siempre", score: 10 },
      { text: "Sí, paso fines de semana fuera", score: 5, recommendationId: "simulacion" },
      { text: "Es una segunda residencia casi siempre vacía", score: 0, recommendationId: "residencias" },
      { text: "Viajo por trabajo con frecuencia", score: 5, recommendationId: "videoportero" }
    ]
  },
  {
    id: 6,
    text: "¿Tienes control de quién llama a tu puerta cuando no estás?",
    options: [
      { text: "Sí, videoportero inteligente en el móvil", score: 10 },
      { text: "Mirilla tradicional solamente", score: 2, recommendationId: "videoportero" },
      { text: "No tengo forma de saberlo", score: 0, recommendationId: "videoportero" }
    ]
  },
  {
    id: 7,
    text: "¿La iluminación exterior es automática o inteligente?",
    options: [
      { text: "Sí, se activa por movimiento o horario", score: 10 },
      { text: "No, siempre está apagada o encendida manual", score: 0, recommendationId: "simulacion" },
      { text: "Solo tengo luz en la puerta principal", score: 4, recommendationId: "simulacion" }
    ]
  },
  {
    id: 8,
    text: "¿Vives en una zona con histórico de robos u okupaciones?",
    options: [
      { text: "Zona muy tranquila y segura", score: 10 },
      { text: "Ha habido casos en calles cercanas", score: 5, recommendationId: "alarma" },
      { text: "Es un punto 'caliente' con riesgo alto", score: 0, recommendationId: "residencias" }
    ]
  },
  {
    id: 9,
    text: "Si entrasen en tu casa ahora, ¿cuánto tardarías en saberlo?",
    options: [
      { text: "Segundos, me avisaría el móvil/alarma", score: 10 },
      { text: "Horas, cuando mire el móvil por casualidad", score: 3, recommendationId: "alarma" },
      { text: "Días, cuando vuelva yo o me avise un vecino", score: 0, recommendationId: "residencias" }
    ]
  },
  {
    id: 10,
    text: "¿Tus sistemas de seguridad tienen batería de respaldo (UPS)?",
    options: [
      { text: "Sí, funcionan aunque corten la luz", score: 10 },
      { text: "No, si cortan los plomos me quedo sin nada", score: 0, recommendationId: "cctv" },
      { text: "No lo sé con seguridad", score: 0, recommendationId: "alarma" }
    ]
  }
];

interface ProductRecommendation {
  id: string;
  name: string;
  price: string;
  image: string;
  url: string;
  reason: string;
}

export default function SecurityQuiz() {
  const [step, setStep] = useState<number>(0); 
  const [answers, setAnswers] = useState<number[]>([]); // Almacena el índice de la opción seleccionada para cada pregunta
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isDictamenOpen, setIsDictamenOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calcular puntuación final usando la puntuación de cada opción elegida
      const finalScore = newAnswers.reduce((total, optionIdx, qIdx) => {
        return total + questions[qIdx].options[optionIdx].score;
      }, 0);
      setScore(Math.min(finalScore, 100));
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setIsFinished(false);
    setScore(0);
  };

  // Cálculo de los 3 Vectores de la Auditoría Técnica
  const calcularVectores = () => {
    const q1Idx = answers[0]; // Vivienda (0)
    const q4Idx = answers[3]; // Accesos (3)
    const q7Idx = answers[6]; // Iluminación (6)

    const q2Idx = answers[1]; // Alarma (1)
    const q3Idx = answers[2]; // CCTV (2)
    const q6Idx = answers[5]; // Control llamadas (5)

    const q5Idx = answers[4]; // Ausencias (4)
    const q8Idx = answers[7]; // Historial (7)
    const q9Idx = answers[8]; // Tiempo (8)
    const q10Idx = answers[9]; // Batería (9)

    // Vector 1: Resistencia y Prevención Física (Máximo: 10 + 15 + 10 = 35)
    let fisicoScore = 0;
    if (q1Idx !== undefined) fisicoScore += questions[0].options[q1Idx].score;
    if (q4Idx !== undefined) fisicoScore += questions[3].options[q4Idx].score;
    if (q7Idx !== undefined) fisicoScore += questions[6].options[q7Idx].score;
    const fisicoPct = Math.round((fisicoScore / 35) * 100);

    // Vector 2: Detección Activa y Control Digital (Máximo: 20 + 15 + 10 = 45)
    let deteccionScore = 0;
    if (q2Idx !== undefined) deteccionScore += questions[1].options[q2Idx].score;
    if (q3Idx !== undefined) deteccionScore += questions[2].options[q3Idx].score;
    if (q6Idx !== undefined) deteccionScore += questions[5].options[q6Idx].score;
    const deteccionPct = Math.round((deteccionScore / 45) * 100);

    // Vector 3: Resiliencia y Mitigación Operativa (Máximo: 10 + 10 + 10 + 10 = 40)
    let resilienciaScore = 0;
    if (q5Idx !== undefined) resilienciaScore += questions[4].options[q5Idx].score;
    if (q8Idx !== undefined) resilienciaScore += questions[7].options[q8Idx].score;
    if (q9Idx !== undefined) resilienciaScore += questions[8].options[q9Idx].score;
    if (q10Idx !== undefined) resilienciaScore += questions[9].options[q10Idx].score;
    const resilienciaPct = Math.round((resilienciaScore / 40) * 100);

    return {
      fisico: Math.min(fisicoPct, 100),
      deteccion: Math.min(deteccionPct, 100),
      resiliencia: Math.min(resilienciaPct, 100)
    };
  };

  // Generación de auditoría personalizada detallada
  const getAuditDetails = () => {
    const positives: string[] = [];
    const vulnerabilities: string[] = [];

    const q1Idx = answers[0];
    const q2Idx = answers[1];
    const q3Idx = answers[2];
    const q4Idx = answers[3];
    const q5Idx = answers[4];
    const q6Idx = answers[5];
    const q7Idx = answers[6];
    const q8Idx = answers[7];
    const q9Idx = answers[8];
    const q10Idx = answers[9];

    // Alarma
    if (q2Idx === 0) {
      positives.push("Alarma conectada a central de policía o aviso automatizado activo que reduce dramáticamente el tiempo de asalto.");
    } else {
      vulnerabilities.push("Alarma sonora o nula: No asegura una respuesta policial automatizada e inmediata, dejándote sin comunicación externa directa.");
    }

    // Videovigilancia
    if (q3Idx === 0) {
      positives.push("Monitoreo perimetral continuo con grabación 24/7 de alta definición para auditar cualquier merodeo previo.");
    } else if (q3Idx === 3) {
      vulnerabilities.push("Inexistencia de CCTV: Ausencia absoluta de registro visual forense en la vivienda, lo que impide comprobar intrusiones en directo.");
    } else {
      vulnerabilities.push("Sistema de cámaras desactualizado o sin redundancia, impidiendo un análisis perimetral nocturno óptimo.");
    }

    // Accesos
    if (q4Idx === 0) {
      positives.push("Estructura de acceso blindada con sensorización sísmica en la entrada prioritaria.");
    } else if (q4Idx === 3) {
      vulnerabilities.push("Cerradura crítica delantera: Cerrojamiento estándar vulnerable a técnicas sigilosas de ganzuado manual o bumping mecánico.");
    } else if (q4Idx === 2) {
      vulnerabilities.push("Múltiples accesos/ventanas vulnerables con riesgo elevado de intrusión sin detección previa.");
    } else {
      vulnerabilities.push("Puerta estándar sin sensores activos: No recibirás aviso antes de que fuercen físicamente el marco de entrada.");
    }

    // Ausencias
    if (q5Idx === 2) {
      vulnerabilities.push("Segunda residencia casi siempre vacía: Sin simulación o videovigilancia robusta, el riesgo de usurpación se multiplica exponencialmente.");
    } else if (q5Idx === 1 || q5Idx === 3) {
      vulnerabilities.push("Ausencia predictiva: Los viajes recurrentes abren ventanas horarias fáciles de auditar por delincuentes locales.");
    }

    // Control de llamadas (Mirilla)
    if (q6Idx === 0) {
      positives.push("Control presencial frontal: Capacidad de disuadir timbrazos ficticios respondiendo de forma remota.");
    } else {
      vulnerabilities.push("Fallo en control de llamadas: El timbrado de marcado táctico para monitorizar tu presencia no está cubierto.");
    }

    // Iluminación
    if (q7Idx === 0) {
      positives.push("Señalización lumínica preventiva e inteligente para eliminar puntos ciegos nocturnos.");
    } else {
      vulnerabilities.push("Escasa visibilidad del perímetro en horas críticas, facilitando el sabotaje de cerraduras bajo la sombra.");
    }

    // Respaldo de batería UPS
    if (q10Idx === 0) {
      positives.push("Protección inmune a cortes de red general y sabotaje de fusibles.");
    } else if (q10Idx === 1) {
      vulnerabilities.push("Extracción crítica de energía: Un corte intencionado de luz apaga por completo tu CCTV y tu router de fibra.");
    }

    // Safeguards
    if (positives.length === 0) positives.push("Actitud proactiva de búsqueda de blindaje de seguridad.");
    if (vulnerabilities.length === 0) vulnerabilities.push("Ningún punto ciego inmediato. Recomendamos seguir manteniendo actualizadas las contraseñas.");

    // Clasificación de la categoría del recomendado según las respuestas
    let detectedCategory = "vivienda";
    if (q1Idx === 3) {
      detectedCategory = "negocios";
    } else if (q5Idx === 2) {
      detectedCategory = "residencias";
    }

    const categoryData = solutionCategories.find(c => c.id === detectedCategory) || solutionCategories[0];

    // Scoring para determinar el orden de prioridad y los motivos personalizados específicos de cada producto de la sección
    const productScores: number[] = [0, 0, 0, 0, 0, 0];
    const itemReasons: string[] = ["", "", "", "", "", ""];

    if (detectedCategory === "vivienda") {
      // v1 - TP-Link Tapo C335
      productScores[0] = 1;
      if (q3Idx !== 0) productScores[0] += 3;
      itemReasons[0] = "Dado que careces de protección visual interior constante, te sugerimos la cámara Tapo C335: graba en resolución 2K y cuenta con un obturador físico real para garantizar tu privacidad absoluta en casa.";

      // v2 - Eufy Video Doorbell E340
      productScores[1] = 1;
      if (q6Idx !== 0) productScores[1] += 4;
      itemReasons[1] = "Al no tener una forma interactiva de vigilar llamadas, el videoportero de doble lente Eufy E340 es idóneo para advertir merodeos y hablar con visitas desde el móvil simulando presencia.";

      // v3 - Kit Tapo T110 + Hub H100
      productScores[2] = 2;
      if (q2Idx !== 0) productScores[2] += 5;
      if (q4Idx === 1 || q4Idx === 2) productScores[2] += 3;
      itemReasons[2] = "No tienes una alarma robusta con sensores de apertura. Este kit con Hub-Sirena Tapo te avisará al milisegundo al móvil ante forcejeos de accesos, constituyendo una alarma sin cuotas magnífica.";

      // v4 - Eufy Security SoloCam S340
      productScores[3] = 2;
      if (q3Idx === 3) productScores[3] += 3;
      if (q10Idx === 1) productScores[3] += 2;
      itemReasons[3] = "La mejor defensa perimetral exterior para tu hogar. Se recarga sola de forma pasiva mediante su panel solar y rota 360 grados, garantizando visibilidad continua sin cables ni mantenimiento.";

      // v5 - TP-Link Tapo L535E
      productScores[4] = 0;
      if (q5Idx === 1 || q5Idx === 3) productScores[4] += 4;
      if (q7Idx !== 0) productScores[4] += 2;
      itemReasons[4] = "Frente a ausencias repetidas, esta potente bombilla inteligente L535E activará de forma automática el Modo Ausencia perimetral, simulando actividad natural para disuadir a posibles intrusos.";

      // v6 - Amazon Echo Hub
      productScores[5] = 1;
      itemReasons[5] = "El lienzo táctil de mandos ideal de 8 pulgadas para centralizar en tu entrada y ver en directo todas tus cámaras, sensores perimetrales y alarmas del ecosistema doméstico de forma unificada.";

    } else if (detectedCategory === "negocios") {
      // n1 - Reolink RLK8-800B4
      productScores[0] = 2;
      if (q3Idx !== 0) productScores[0] += 5;
      if (q9Idx === 1 || q10Idx === 1) productScores[0] += 3;
      itemReasons[0] = "La opción profesional por excelencia para comercios. Este kit CCTV con NVR de 2TB graba por cable ethernet PoE estable 24/7 en nitidez 4K, siendo inmune a inhibidores de WiFi.";

      // n2 - TP-Link Omada ER605 V2
      productScores[1] = 1;
      if (q10Idx === 1) productScores[1] += 2;
      itemReasons[1] = "La red de un comercio requiere protección digital total. Este router balanceador Omada crea túneles VPN privados y admite dos líneas de internet simultáneas para que el negocio jamás quede a ciegas.";

      // n3 - Hikvision Pro Series AcuSense DS-2CD2186G2-I
      productScores[2] = 1;
      if (q4Idx !== 0) productScores[2] += 4;
      if (q8Idx === 2) productScores[2] += 3;
      itemReasons[2] = "Ideal para proteger accesos principales del local o cajas registrados. Su domo metálico posee certificación antivandálica IK10 contra golpes y su IA AcuSense evita alertas accidentales.";

      // n4 - Reolink RLC-810A
      productScores[3] = 1;
      itemReasons[3] = "Perfecta para los accesos delanteros de clientes. Captura vídeo de alta fidelidad e incorpora analítica inteligente de conteo de personas diario para monitorizar el aforo del local.";

      // n5 - Eufy Security Cam 3C - Kit de 2
      productScores[4] = 1;
      if (q3Idx === 3) productScores[4] += 3;
      itemReasons[4] = "Si tu local comercial es de alquiler y buscas evitar obras o canalizar cables, este kit inalámbrico 4K con IA BionicMind reconoce a tus trabajadores y se instala en escasos minutos de forma cómoda.";

      // n6 - WD Purple Pro 4TB
      productScores[5] = 1;
      if (q10Idx === 1) productScores[5] += 2;
      itemReasons[5] = "El componente de almacenamiento clave para tu servidor CCTV. Este disco Pro soporta escritura ininterrumpida de cámaras 4K e IA de forma simultánea garantizando que poyectes evidencias legales perfectas.";

    } else {
      // r1 - Ajax StarterKit Cam
      productScores[0] = 3;
      if (q2Idx !== 0) productScores[0] += 5;
      if (q8Idx === 2 || q9Idx === 2) productScores[0] += 4;
      itemReasons[0] = "El blindaje anti-ocupación homologado definitivo en España. Cuenta con batería autónoma y panel de fotos perimetrales instantáneas por 4G móvil, ideal para acreditar delito flagrante ante la policía.";

      // r2 - Reolink Go Ultra
      productScores[1] = 2;
      if (q3Idx === 3) productScores[1] += 5;
      if (q10Idx === 1) productScores[1] += 3;
      itemReasons[1] = "Cámara perimetral 4K independiente del router doméstico y la corriente eléctrica general. Con su panel solar integrado y tarjeta SIM 4G, vigila tu propiedad vacacional aunque bajen el interruptor del tendido.";

      // r3 - Eufy Security SoloCam S340
      productScores[2] = 1;
      if (q5Idx === 2) productScores[2] += 3;
      itemReasons[2] = "Excelente si dispones de WiFi perimetral en la parcela exterior. Su lente dual con zoom interactivo de 8 aumentos se recarga mediante energía solar pasiva garantizando visibilidad en meses de ausencia.";

      // r4 - X-Sense XS01-WX
      productScores[3] = 1;
      if (q5Idx === 2) productScores[3] += 2;
      itemReasons[3] = "Las propiedades vacías se ven expuestas a averías eléctricas de cortocircuito o fugas. Este detector inteligente de incendios te notificará directamente al móvil para alertar a bomberos a tiempo.";

      // r5 - Nuki Smart Lock Ultra
      productScores[4] = 1;
      if (q4Idx === 3) productScores[4] += 4;
      itemReasons[4] = "Inhabilita asaltos sigilosos por bumping y te permite emitir accesos digitales remotos a familiares o técnicos de piscinas con horarios restringidos sin entregar llaves físicas tradicionales.";

      // r6 - Sensores Tapo T110 + Hub H100
      productScores[5] = 1;
      if (q4Idx === 2) productScores[5] += 3;
      itemReasons[5] = "El primer muro de contención. Coloca estos micro-sensores en persianas perimetrales o ventanas vulnerables para enterarte al móvil del primer milímetro de asalto mientras activas su potente sirena.";
    }

    const mappedRecommendations = categoryData.products.map((prod, idx) => ({
      id: prod.id,
      name: prod.name,
      price: "Ver precio",
      image: prod.image,
      url: prod.amazonUrl,
      reason: itemReasons[idx],
      score: productScores[idx]
    }));

    // Ordenar descendente según la puntuación de prioridad calculada
    mappedRecommendations.sort((a, b) => b.score - a.score);

    // Seleccionar los 3 mejores y retornar descartando la propiedad temporal 'score'
    const finalRecommendations: ProductRecommendation[] = mappedRecommendations
      .slice(0, 3)
      .map(({ score, ...rest }) => rest);

    return {
      positives: positives.slice(0, 3),
      vulnerabilities: vulnerabilities.slice(0, 3),
      recommendations: finalRecommendations
    };
  };

  if (isFinished) {
    const vectores = calcularVectores();
    const { positives, vulnerabilities, recommendations: finalRecs } = getAuditDetails();
    const q5Idx = answers[4]; // Ausencias (segunda residencia, etc.)
    const q10Idx = answers[9]; // Batería de respaldo

    return (
      <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
        <Helmet>
          <title>Resultado de tu Evaluación de Seguridad | TISA Seguridad</title>
          <meta name="description" content="Resultados personalizados del test de seguridad de TISA. Comprobación de vulnerabilidades y de consejos de protección recomendados." />
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href="https://tisaseguridad.shop/evaluacion" />
        </Helmet>
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-5xl border border-white/5 p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-3 ${score > 70 ? 'bg-green-500' : score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full glass mb-12 border border-white/10">
              <span className={`text-5xl font-display font-bold ${score > 70 ? 'text-green-500' : score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                {score}
              </span>
              <div className="absolute inset-0 rounded-full border-4 border-white/5" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter leading-tight">Escaneado <br /><span className="text-blue-500 font-semibold">Técnico Completado</span></h1>
            <p className="text-xl text-neutral-400 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
              Tu índice global de blindaje residencial es de <strong className="text-white font-semibold">{score}/100</strong>. 
              {score < 50 ? " Tu vivienda presenta vulnerabilidades críticas que comprometen seriamente tu tranquilidad ante allanamientos e intrusiones organizadas." : 
               score < 80 ? " Cuentas con medidas iniciales de seguridad, pero existen puntos ciegos técnicos que permiten accesos sin detección inmediata." : 
               " ¡Enhorabuena! Dispones de un nivel de prevención técnico muy elevado."}
            </p>

            {/* Diagnóstico Detallado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-20">
              <div className="p-10 glass rounded-4xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50" />
                <div className="flex items-center gap-4 mb-6 text-green-500">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Análisis Preventivo Positivo</span>
                </div>
                <ul className="space-y-4 text-sm text-neutral-400 font-light">
                  {positives.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-10 glass rounded-4xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                <div className="flex items-center gap-4 mb-6 text-red-500">
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                  <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Vulnerabilidades Halladas</span>
                </div>
                <ul className="space-y-4 text-sm text-neutral-400 font-light">
                  {vulnerabilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vectores de Seguridad */}
            <div className="mb-20 text-left">
              <h2 className="text-2xl font-display font-bold mb-10 tracking-widest uppercase text-xs text-blue-500 text-center">Vectores de Seguridad Analizados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Vector I */}
                <div className="p-8 glass rounded-4xl border border-white/5 relative overflow-hidden flex flex-col justify-between group">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400 block mb-2">Vector I</span>
                    <h4 className="text-md font-bold text-white mb-4">Resistencia Física</h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      Mide la robustez estructural de los accesos principales, cerrojos y la disuasión lumínica exterior ante intentos de forzado físico.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Nivel de blindaje</span>
                      <span className={`text-md font-bold font-mono ${vectores.fisico > 70 ? 'text-green-500' : vectores.fisico > 40 ? 'text-yellow-500' : 'text-red-500'}`}>{vectores.fisico}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${vectores.fisico}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full ${vectores.fisico > 70 ? 'bg-green-500 animate-pulse' : vectores.fisico > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Vector II */}
                <div className="p-8 glass rounded-4xl border border-white/5 relative overflow-hidden flex flex-col justify-between group">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 block mb-2">Vector II</span>
                    <h4 className="text-md font-bold text-white mb-4">Detección y Alerta</h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      Mide la existencia de alarmas activas conectadas, videovigilancia perimetral en tiempo real y el control inmediato sobre el timbre de tu entrada.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Nivel de detección</span>
                      <span className={`text-md font-bold font-mono ${vectores.deteccion > 70 ? 'text-green-500' : vectores.deteccion > 40 ? 'text-yellow-500' : 'text-red-500'}`}>{vectores.deteccion}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${vectores.deteccion}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className={`h-full ${vectores.deteccion > 70 ? 'bg-green-500 animate-pulse' : vectores.deteccion > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Vector III */}
                <div className="p-8 glass rounded-4xl border border-white/5 relative overflow-hidden flex flex-col justify-between group">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 block mb-2">Vector III</span>
                    <h4 className="text-md font-bold text-white mb-4">Resiliencia y Autonomía</h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      Mide el aguante de tus protecciones ante cortes intencionados de luz, tus dinámicas horarias de ausencias y el grado de vulnerabilidad de tu zona.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Nivel de resiliencia</span>
                      <span className={`text-md font-bold font-mono ${vectores.resiliencia > 70 ? 'text-green-500' : vectores.resiliencia > 40 ? 'text-yellow-500' : 'text-red-500'}`}>{vectores.resiliencia}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${vectores.resiliencia}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className={`h-full ${vectores.resiliencia > 70 ? 'bg-green-500 animate-pulse' : vectores.resiliencia > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dictamen Jurídico y Técnico del Experto */}
            <div className="mb-20 text-left p-6 sm:p-10 glass rounded-4xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-neutral-800 pointer-events-none hidden sm:block">
                <ShieldAlert className="w-40 h-40 opacity-[0.03]" />
              </div>
              
              {/* Header interactivo solo en móvil, estático en desktop */}
              <div 
                onClick={() => setIsDictamenOpen(!isDictamenOpen)} 
                className="flex items-center justify-between cursor-pointer sm:cursor-default sm:pointer-events-none select-none"
              >
                <div>
                  <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest">Dictamen Técnico y Jurídico</h3>
                  <h4 className="text-xl font-display font-bold text-white mt-2 hidden sm:block">Perspectiva de la Legislación en España (2026)</h4>
                </div>
                
                {/* Chevron indicador solo en móvil */}
                <div className="sm:hidden text-neutral-400 p-2 glass rounded-xl border border-white/5">
                  {isDictamenOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  )}
                </div>
              </div>

              {/* Título secundario para móvil (se muestra abajo del header interactivo si está colpsado/desplegado) */}
              <h4 className="text-lg font-display font-bold text-white mt-4 sm:hidden">
                Perspectiva de la Legislación en España (2026)
              </h4>

              {/* Contenido colapsable en móvil, siempre visible a partir de sm (desktop) */}
              <div className={`mt-6 transition-all duration-300 ${isDictamenOpen ? "block" : "hidden sm:block"}`}>
                <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">
                  El protocolo de actuación de las Fuerzas y Cuerpos de Seguridad del Estado (Policía Nacional y Guardia Civil) está determinado de forma estricta por la naturaleza de la propiedad y tu capacidad de acreditación inmediata de ocupación:
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-white/[0.02] rounded-3xl border border-white/5 transition-all hover:bg-white/[0.04]">
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      <strong className="text-white font-semibold">Allanamiento de Morada vs Usurpación: </strong> 
                      {q5Idx === 2 ? (
                        "Al identificar tu propiedad como una SEGUNDA RESIDENCIA deshabitada usualmente, existe el peligro de que en caso de ocupación o asalto de larga duración, la justicia lo catalogue formalmente como 'Usurpación de inmuebles'. Si no cuentas con registros en vídeo que acrediten que el asalto se ha efectuado en las últimas 48 horas (un hecho delictivo flagrante en curso), los agentes locales no dispondrán de cobertura legal de desalojo directo sin requerimiento judicial, obligándote a pasar por un trámite judicial muy dilatado en el tiempo."
                      ) : (
                        "Al tratarse de tu MORADA PRINCIPAL o habitual, tienes el amparo legal de expulsión policial bajo el cargo penal de 'Allanamiento de morada'. No obstante, el principal escollo que sufren los propietarios es demostrar con seguridad que la irrupción ha ocurrido en las horas previas. Proporcionar grabaciones de videovigilancia automática en tu terminal móvil es el salvoconducto técnico para exigir un desalojo policial directo."
                      )}
                    </p>
                  </div>
                  
                  <div className="p-5 bg-white/[0.02] rounded-3xl border border-white/5 transition-all hover:bg-white/[0.04]">
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      <strong className="text-white font-semibold">Respaldo ante Desconexión o Sabotaje Lumínico: </strong>
                      {q10Idx === 1 ? (
                        "Has indicado que tu sistema carece de alimentación eléctrica redundante. En la actualidad, las intrusiones profesionales se planifican manipulando con antelación el tendido de luz en el exterior (caja general de fusibles en fachada o contadores). Si desactivan los plomos, tu videovigilancia y tu router de fibra se apagarán por completo al instante. Es prioritario integrar un sistema de alarma que trabaje con baterías de backup dedicadas (SAI o UPS) para asegurar el envío de la señal."
                      ) : (
                        "Mantener redundancia eléctrica asegura que la videovigilancia local registre todo lo sucedido aunque un intruso intente sabotear los plomos de luz perimetral antes de manipular la cerradura principal. Continúa garantizando esta resiliencia."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blindaje Recomendado */}
            <div className="mb-20">
              <h2 className="text-2xl font-display font-bold mb-10 tracking-widest uppercase text-xs text-blue-500">Plan de Acción y Blindaje Recomendado</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {finalRecs.map((rec) => (
                  <motion.div 
                    key={rec.id} 
                    whileHover={{ y: -5 }}
                    className="glass p-8 rounded-4xl border border-white/5 flex flex-col items-center group justify-between"
                  >
                    <div className="w-full">
                      <div className="w-full aspect-square bg-white rounded-3xl overflow-hidden mb-6 relative border border-white/10 flex items-center justify-center">
                        <img 
                          src={rec.image} 
                          alt={rec.name} 
                          className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute top-4 right-4">
                          <Award className="w-5 h-5 text-neutral-900" />
                        </div>
                      </div>
                      <h3 className="text-xs font-bold mb-4 text-white uppercase tracking-widest text-center">{rec.name}</h3>
                      <div className="p-4 bg-white/[0.02] rounded-2xl mb-6 border border-white/5">
                        <p className="text-[10px] text-neutral-400 font-light leading-relaxed italic">
                          "{rec.reason}"
                        </p>
                      </div>
                    </div>
                    <a 
                      href={rec.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                    >
                      Consultar <ShoppingCart className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-16 py-10 border-y border-white/5 flex flex-col items-center">
              <p className="text-sm text-neutral-500 mb-6 font-bold uppercase tracking-widest text-center">Comparte tu diagnóstico con alguien que necesite proteger su hogar</p>
              <ShareButtons 
                title="He evaluado la seguridad de mi hogar con Escudo TISA" 
                url={window.location.origin + "/evaluacion"}
                description={`Mi puntuación de seguridad es de ${score}/100. ¡Haz el test tú también!`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={resetQuiz}
                className="px-10 py-5 glass hover:bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Reiniciar Test
              </button>
              <Link 
                to="/#experiencia" 
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98]"
              >
                Auditoría Profesional <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>Test de Seguridad Escudo TISA | Evalúa tu Vivienda</title>
        <meta name="description" content="Realiza nuestro test de seguridad gratuito en 10 minutos para auditar los puntos vulnerables de tu hogar o negocio con consejos prácticos personalizados." />
        <link rel="canonical" href="https://tisaseguridad.shop/evaluacion" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Test de Seguridad Escudo TISA | Evalúa tu Vivienda" />
        <meta property="og:description" content="Realiza nuestro test de seguridad gratuito en 10 minutos para auditar los puntos vulnerables de tu hogar o negocio." />
        <meta property="og:url" content="https://tisaseguridad.shop/evaluacion" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Test de Seguridad Escudo TISA | Evalúa tu Vivienda" />
        <meta name="twitter:description" content="Realiza nuestro test de seguridad gratuito en 10 minutos para auditar los puntos vulnerables de tu hogar o negocio." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp" />
      </Helmet>
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-20">
          <Link to="/" className="group inline-flex items-center gap-3 text-neutral-500 font-bold mb-16 hover:text-white transition-all uppercase tracking-widest text-[10px]">
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            Cancelar Evaluación
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 px-3 py-1 glass rounded-lg">
              <ShieldAlert className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-300">Cuestionario en curso</span>
            </div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pregunta {step + 1} / {questions.length}</span>
          </div>
          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden glass">
            <motion.div 
              className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" 
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="glass-dark rounded-5xl border border-white/5 p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 leading-[1.1] tracking-tighter text-white">
              {currentQuestion.text}
            </h2>

            <div className="grid gap-5">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-8 glass hover:bg-blue-600 border border-white/5 transition-all group flex items-center justify-between rounded-3xl text-left"
                >
                  <span className="font-bold text-neutral-400 group-hover:text-white transition-colors tracking-tight text-lg">{option.text}</span>
                  <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                    <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-8 py-4 glass rounded-2xl border border-white/5 text-[10px] text-neutral-600 font-bold uppercase tracking-widest"
          >
            <Lock className="w-4 h-4 text-blue-500" />
            Tu diagnóstico se procesa localmente y no almacenamos información personal.
          </motion.div>
        </div>
      </div>
    </div>
  );
}
