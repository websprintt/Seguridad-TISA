import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShoppingCart,
  Award
} from 'lucide-react';

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

const recommendations: Record<string, ProductRecommendation> = {
  alarma: {
    id: "r1",
    name: "Ring Alarm Kit (2ª Gen)",
    price: "Ver precio",
    image: "https://m.media-amazon.com/images/I/51wW-U0VnDL._AC_SL1000_.jpg",
    url: "https://www.amazon.es/s?k=Ring+Alarm+2nd+Gen",
    reason: "Hemos detectado que no tienes un sistema de alerta activa. Este kit es la base para recibir avisos inmediatos en tu móvil si alguien intenta entrar."
  },
  cctv: {
    id: "r2",
    name: "Reolink 4K PoE Kit",
    price: "Ver precio",
    image: "https://m.media-amazon.com/images/I/71X8uX+vCXL._AC_SL1500_.jpg",
    url: "https://www.amazon.es/s?k=Reolink+RLK8-800B4",
    reason: "Tu vivienda carece de grabación 24/7. Con este sistema tendrás evidencia visual nítida en 4K de todo lo que ocurre, incluso si cortan el WiFi."
  },
  nuki: {
    id: "r3",
    name: "Nuki Smart Lock Pro",
    price: "Ver precio",
    image: "https://m.media-amazon.com/images/I/51F-N1-A-SL._AC_SL1500_.jpg",
    url: "https://www.amazon.es/s?k=Nuki+Smart+Lock+Pro",
    reason: "Tu cerradura actual es un punto débil. Nuki te permite controlar accesos remotamente y elimina el riesgo de copias de llaves no autorizadas."
  },
  videoportero: {
    id: "r4",
    name: "Ring Video Doorbell",
    price: "Ver precio",
    image: "https://m.media-amazon.com/images/I/51LYJlS+mDL._SY741_.jpg",
    url: "https://www.amazon.es/s?k=Ring+Video+Doorbell",
    reason: "Detectamos que no controlas quién llama cuando no estás. Este dispositivo te permite ver y hablar con visitas desde cualquier lugar del mundo."
  },
  simulacion: {
    id: "r5",
    name: "Philips Hue Bridge + Pack",
    price: "Ver precio",
    image: "https://m.media-amazon.com/images/I/61VNJ0D9gCL._AC_SX679_.jpg",
    url: "https://www.amazon.es/s?k=Philips+Hue+Bridge",
    reason: "Al pasar tiempo fuera, tu casa parece vacía. Automatizar luces es la mejor forma de simular presencia y disuadir a posibles intrusos."
  },
  sensores: {
    id: "r6",
    name: "Sensores Puerta Meross",
    price: "Ver precio",
    image: "https://m.media-amazon.com/images/I/51kx9M0oeTL._AC_SX679_.jpg",
    url: "https://www.amazon.es/s?k=Meross+sensores+puerta",
    reason: "Tienes accesos (ventanas o puertas) sin proteger. Estos sensores te avisarán antes de que el intruso llegue a entrar en las habitaciones."
  }
};

export default function SecurityQuiz() {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<number[]>([]);
  const [recIds, setRecIds] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (optionScore: number, recId?: string) => {
    const newAnswers = [...answers, optionScore];
    setAnswers(newAnswers);
    
    if (recId) {
      setRecIds(prev => new Set(prev).add(recId));
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const finalScore = newAnswers.reduce((a, b) => a + b, 0);
      setScore(Math.min(finalScore, 100));
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setRecIds(new Set());
    setIsFinished(false);
    setScore(0);
  };

  if (isFinished) {
    const finalRecs = Array.from(recIds).map(id => recommendations[id]).filter(Boolean).slice(0, 3);

    return (
      <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
        <Helmet>
          <title>Resultado de Evaluación de Seguridad | TISA</title>
        </Helmet>
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/50 rounded-[3rem] border border-white/5 p-12 text-center shadow-2xl relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${score > 70 ? 'bg-green-500' : score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
            
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-800 mb-8 border border-white/10">
              <span className={`text-4xl font-bold ${score > 70 ? 'text-green-500' : score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                {score}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">Evaluación Completada</h1>
            <p className="text-xl text-neutral-400 mb-12">
              Tu puntuación de seguridad es de <strong>{score}/100</strong>. 
              {score < 50 ? " Tu vivienda presenta vulnerabilidades críticas que requieren atención." : 
               score < 80 ? " Tienes una base sólida pero hay puntos ciegos importantes." : 
               " ¡Buen trabajo! Tu nivel de protección es excelente."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
              <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <div className="flex items-center gap-3 mb-4 text-blue-500">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Puntos Fuertes</span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>• Respetas las normas básicas de prevención</li>
                  <li>• Eres consciente de los riesgos de intrusión</li>
                </ul>
              </div>
              <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Puntos de Mejora</span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>• Falta de respuesta ante cortes de red</li>
                  <li>• Huecos de vigilancia en zonas secundarias</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold mb-8">Nuestras recomendaciones para ti:</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {finalRecs.map((rec) => (
                <div key={rec.id} className="bg-neutral-950 p-6 rounded-3xl border border-white/5 flex flex-col items-center group">
                  <div className="w-full aspect-square bg-neutral-900 rounded-2xl overflow-hidden mb-4">
                    <img src={rec.image} alt={rec.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-sm font-bold mb-2 text-white">{rec.name}</h3>
                  <div className="bg-blue-600/10 rounded-xl p-3 mb-4 border border-blue-600/10">
                    <p className="text-[10px] text-blue-400 font-medium leading-relaxed italic">
                      "{rec.reason}"
                    </p>
                  </div>
                  <a 
                    href={rec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-auto py-3 bg-white text-black rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                  >
                    Ver en Amazon <ShoppingCart className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Repetir Test
              </button>
              <Link 
                to="/#alarma-pro" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                Estudio Profesional Gratis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <Helmet>
        <title>Test de Seguridad Escudo TISA | Evalúa tu Vivienda</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Abandonar test
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Evaluación de Seguridad</span>
            <span className="text-xs font-bold text-neutral-500">Pregunta {step + 1} de {questions.length}</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600" 
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-neutral-900/50 rounded-[2.5rem] border border-white/5 p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-10 leading-tight">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score, option.recommendationId)}
                  className="w-full p-6 bg-black/40 hover:bg-white/5 border border-white/5 hover:border-blue-500/50 rounded-2xl text-left transition-all group flex items-center justify-between"
                >
                  <span className="font-bold text-neutral-300 group-hover:text-white">{option.text}</span>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-600/20">
                    <ChevronRight className="w-4 h-4 text-transparent group-hover:text-blue-500" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900/50 rounded-2xl border border-white/5 text-sm text-neutral-500">
            <ShieldAlert className="w-4 h-4 text-blue-500" />
            Tus datos no son guardados. Evaluación privada 100%.
          </div>
        </div>
      </div>
    </div>
  );
}
