import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ArrowRight, Zap } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

const AllSolutions = () => {
  const cases = [
    {
      id: "vivienda",
      title: "Para tu vivienda",
      image: "/img/casas.webp",
      items: ["Cámaras WiFi Inteligentes", "Sensores de Puertas/Ventanas", "Videoporteros de alta resolución"],
      gridClass: "lg:col-span-2"
    },
    {
      id: "negocios",
      title: "Para negocios",
      image: "/img/negocios.webp",
      items: ["CCTV Profesional", "Grabación 24/7 en Nube o Local"],
      gridClass: "lg:col-span-1"
    },
    {
      id: "residencias",
      title: "Segundas residencias",
      image: "/img/okupas.webp",
      items: ["Alarmas Anti Okupas", "Sensores por Infrarrojos"],
      gridClass: "lg:col-span-3"
    }
  ];

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>Sistemas de Blindaje y Seguridad | TISA Seguridad</title>
        <meta name="description" content="Soluciones diseñadas específicamente para cada escenario real que enfrentas cada día. Análisis de sistemas para viviendas, negocios y segundas residencias." />
        <link rel="canonical" href="https://tisaseguridad.shop/servicios-de-blindaje" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Catálogo de Blindaje Técnico | Seguridad TISA" />
        <meta property="og:description" content="Opinión técnica independiente de sistemas de seguridad. Explora las soluciones recomendadas sin cuotas." />
        <meta property="og:url" content="https://tisaseguridad.shop/servicios-de-blindaje" />
        <meta property="og:image" content="https://tisaseguridad.shop/img/casas.webp" />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pt-10 border-b border-white/5 pb-10">
          <Link to="/#soluciones" className="group inline-flex items-center gap-3 text-neutral-500 font-bold hover:text-white transition-all uppercase tracking-widest text-[10px]">
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            Volver a la Estrategia de Blindaje
          </Link>

          <Link to="/evaluacion" className="group inline-flex items-center gap-4 bg-blue-600/10 border border-blue-500/20 px-8 py-4 rounded-2xl text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-600/10 active:scale-[0.98]">
            <Zap className="w-4 h-4 fill-current" />
            ¿No estás seguro de qué necesitas? Haz el Diagnóstico ahora
          </Link>
        </div>

        <section id="soluciones-completas" className="mb-20">
          <div className="text-left mb-24 max-w-4xl">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Catálogo de Escenarios
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter leading-tight text-white">
              Análisis honesto, <span className="text-blue-500">sistemas sin cuotas</span>
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed font-light">
              Opiniones técnicas independientes e información detallada de los mejores equipos recomendados en Amazon para cada escenario real.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {cases.map((sc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-5xl bg-neutral-900 border border-white/5 h-[600px] flex flex-col justify-end ${sc.gridClass}`}
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={getAssetPath(sc.image)} 
                    alt={sc.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                
                <div className="p-10 relative z-10">
                  <h3 className="text-4xl font-display font-bold mb-6 tracking-tight">{sc.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {sc.items.map((item, idx) => (
                      <span key={idx} className="glass px-4 py-2 rounded-full text-xs font-semibold text-neutral-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/soluciones/${sc.id}`}
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-600 hover:text-white"
                  >
                    Explorar soluciones
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllSolutions;
