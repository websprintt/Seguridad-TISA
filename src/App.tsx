/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, 
  Camera, 
  Bell, 
  Home as HomeIcon, 
  Briefcase, 
  Warehouse, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  ExternalLink,
  Phone,
  Menu,
  X,
  AlertTriangle,
  Lock,
  Eye,
  Smartphone,
  ArrowRight,
  ShoppingCart,
  Award,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import BlogList from './components/BlogList';
import BlogPostDetail from './components/BlogPost';
import SolutionDetail from './components/SolutionDetail';
import SecurityQuiz from './components/SecurityQuiz';

import { 
  ENCODED_PHONE, 
  ENCODED_EMAIL,
  handleSecureInteraction 
} from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problemas', href: '/#problemas' },
    { name: 'Soluciones', href: '/#soluciones' },
    { name: 'Recomendados', href: '/#recomendados' },
    { name: 'Alarma Pro', href: '/#alarma-pro' },
    { name: 'Blog', href: '/#blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp" 
            alt="Seguridad TISA Logo" 
            className="h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="text-sm font-medium text-neutral-300 hover:text-blue-500 transition-colors">
              {link.name}
            </Link>
          ))}
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
            aria-label="Pedir asesoramiento gratuito"
            onClick={() => document.getElementById('alarma-pro')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Estudio Gratis
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-neutral-900 border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-lg font-medium text-neutral-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                className="bg-blue-600 text-white px-6 py-4 rounded-xl text font-semibold min-h-[48px]"
                aria-label="Pedir asesoramiento gratuito móvil"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('alarma-pro')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Solicitar Estudio Seguridad
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 border-b border-white/5 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/4eda08cb13506fc51b80c5b0247d396be2bd8416/img/banner.webp"
          alt="Sistemas de seguridad y alarmas profesionales - Seguridad TISA"
          className="w-full h-full object-cover blur-[2px] opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-600/15 border border-blue-600/30 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
              Sistemas de Seguridad Inteligentes e Informativos
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Protege tu vivienda o negocio con sistemas de seguridad <span className="text-blue-600">realmente efectivos</span>
            </h1>
            <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Analizamos y seleccionamos cámaras, alarmas y sistemas profesionales para ayudarte a elegir la mejor solución sin pagar de más ni sacrificar tu privacidad.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group"
                aria-label="Ver sistemas de seguridad recomendados"
                onClick={() => document.getElementById('recomendados')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver sistemas recomendados
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm"
                aria-label="Solicitar asesoramiento personalizado"
                onClick={() => document.getElementById('alarma-pro')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar estudio gratuito
              </button>
            </div>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0">
               <div className="flex items-center gap-2 font-display font-bold text-xl">TRUSTBULL</div>
               <div className="flex items-center gap-2 font-display font-bold text-xl">S-LOCK</div>
               <div className="flex items-center gap-2 font-display font-bold text-xl">VISIONPRO</div>
               <div className="flex items-center gap-2 font-display font-bold text-xl">SECUREWAY</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Problems = () => {
  const problems = [
    {
      icon: <AlertTriangle className="w-10 h-10 text-blue-600" />,
      title: "Ola de Robos crecientes",
      description: "Los robos en viviendas y locales han aumentado un 15% este año. No esperes a ser el siguiente."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Amenaza de Okupas",
      description: "La desproteccion legal exige una respuesta técnica rápida. Detectar la entrada en los primeros minutos es clave."
    },
    {
      icon: <Eye className="w-10 h-10 text-blue-600" />,
      title: "Falta de control real",
      description: "¿Qué pasa en tu casa o negocio cuando no estás? Necesitas ojos inteligentes, no solo una caja que pita."
    },
    {
      icon: <Lock className="w-10 h-10 text-blue-600" />,
      title: "Sistemas obsoletos",
      description: "Las alarmas antiguas son fáciles de inhibir. Actualízate a tecnología redundante e inatacable."
    }
  ];

  return (
    <section id="problemas" className="py-24 bg-neutral-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">¿Te preocupa la seguridad de lo que más quieres?</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">Conectamos emocionalmente con tus miedos reales para ofrecer soluciones que de verdad funcionan.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-neutral-950 border border-white/5 rounded-3xl hover:border-blue-600/30 transition-all group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{problem.icon}</div>
              <h3 className="text-xl font-display font-bold mb-3">{problem.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseSolutions = () => {
  const cases = [
    {
      id: "vivienda",
      title: "Para tu vivienda",
      image: "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/625bd7b2a4b216624f909a9f1587aa269893a25c/img/casas.webp",
      items: ["Cámaras WiFi Inteligentes", "Sensores de Puertas/Ventanas", "Videoporteros de alta resolución"]
    },
    {
      id: "negocios",
      title: "Para negocios",
      image: "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/625bd7b2a4b216624f909a9f1587aa269893a25c/img/negocios.webp",
      items: ["CCTV Profesional", "Grabación 24/7 en Nube o Local", "Control de Aforo y Gestión Remota"]
    },
    {
      id: "residencias",
      title: "Segundas residencias",
      image: "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/625bd7b2a4b216624f909a9f1587aa269893a25c/img/okupas.webp",
      items: ["Alarmas Anti Okupas", "Sensores por Infrarrojos", "Aviso inmediato a móvil y central"]
    }
  ];

  return (
    <section id="soluciones" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">No vendemos productos, vendemos tranquilidad</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">Soluciones diseñadas específicamente para cada escenario real que enfrentas cada día.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {cases.map((sc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/5"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={sc.image} 
                  alt={sc.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-6">{sc.title}</h3>
                <ul className="space-y-4">
                  {sc.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/soluciones/${sc.id}`}
                  className="mt-8 block w-full py-4 border border-white/10 hover:bg-white/5 rounded-2xl font-bold transition-all text-center"
                >
                  Ver soluciones para {sc.title.toLowerCase()}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecurityAssessmentSection = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto bg-neutral-900/40 rounded-[3rem] border border-white/5 p-8 md:p-16 backdrop-blur-sm overflow-hidden group">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">Security Lab 2026</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight leading-[1.1]">
                ¿Es tu hogar un <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">objetivo fácil?</span>
              </h2>
              
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-xl">
                Nuestro algoritmo de diagnóstico analiza vulnerabilidades estructurales y tecnológicas en menos de 2 minutos. Obtén un informe detallado con los puntos ciegos de tu vivienda.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link 
                  to="/evaluacion" 
                  className="w-full sm:w-auto bg-white text-neutral-950 px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:bg-blue-500 hover:text-white flex items-center justify-center gap-3 group/btn shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                >
                  Iniciar Diagnóstico Pro
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center gap-4 text-neutral-500">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium italic">+2k diagnósticos realizados</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-neutral-800/50 to-neutral-950/50 rounded-[2.5rem] border border-white/5 p-8 flex flex-col justify-between overflow-hidden">
                {/* Simulated UI elements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-24 bg-neutral-700/50 rounded-full" />
                    <div className="h-6 w-12 bg-blue-600/20 border border-blue-600/30 rounded-md" />
                  </div>
                  <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600"
                      initial={{ width: "30%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse" />
                    <div className="w-20 h-20 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center relative z-10">
                      <ShieldAlert className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Scanning Vulnerabilities...</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-12 bg-neutral-900/50 border border-white/5 rounded-xl flex items-center justify-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-red-500' : i === 2 ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
                    </div>
                  ))}
                </div>

                {/* Decorative scanning line */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const RecommendedSystems = () => {
  const products = [
    {
      id: 1,
      name: "Reolink RLK8-800B4",
      category: "Kit CCTV UltraVision 4K",
      image: "https://m.media-amazon.com/images/I/71X8uX+vCXL._AC_SL1500_.jpg",
      description: "Aunque existen marcas genéricas, el sistema de Reolink sigue siendo el \"rey\" de las ventas por su fiabilidad técnica y su resolución 4K real.",
      whyBest: "Es el sistema PoE (Power over Ethernet) más vendido, lo que significa que un solo cable transmite datos y energía, evitando interferencias de Wi-Fi.",
      features: "Grabación 24/7 (2TB incl.), detección AI de personas/vehículos y visión nocturna pro sin cuotas.",
      amazonUrl: "https://www.amazon.es/s?k=Reolink+RLK8-800B4"
    },
    {
      id: 2,
      name: "Ring Alarm (2ª Gen) de Amazon",
      category: "Alarma Inteligente",
      image: "https://m.media-amazon.com/images/I/51wW-U0VnDL._AC_SL1000_.jpg",
      description: "Es la opción más equilibrada. Al ser un ecosistema propio de Amazon, su integración con Alexa es perfecta y su base en España es masiva.",
      whyBest: "Sistema DIY sin cuotas obligatorias, con plan de vigilancia profesional opcional muy económico.",
      features: "Kit completo: Estación base, teclado, sensores y movimiento. Avisos al móvil en tiempo real.",
      amazonUrl: "https://www.amazon.es/s?k=Ring+Alarm+2nd+Gen"
    },
    {
      id: 3,
      name: "Nuki Smart Lock Pro (4ª/5ª Gen)",
      category: "Cerradura Smart",
      image: "https://m.media-amazon.com/images/I/51F-N1-A-SL._AC_SL1500_.jpg",
      description: "Nuki domina el mercado europeo y español porque está diseñada específicamente para las puertas de aquí (cilindro tipo Euro).",
      whyBest: "No requiere cambiar el bombín. Se instala sobre tu llave actual por el interior de forma rápida.",
      features: "Wi-Fi integrado y Matter-ready. Apertura automática (Auto-unlock) por proximidad.",
      amazonUrl: "https://www.amazon.es/s?k=Nuki+Smart+Lock+Pro"
    }
  ];

  return (
    <section id="recomendados" className="py-24 bg-neutral-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Nuestros sistemas recomendados</h2>
            <p className="text-neutral-400">Seleccionamos solo lo mejor. Sin catálogos infinitos. Solo lo que nosotros mismos instalaríamos.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-neutral-950 rounded-3xl border border-white/5 p-6 flex flex-col">
              <div className="w-full aspect-square bg-neutral-900 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/10 border border-blue-600/20 text-blue-500">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Calidad TISA</span>
                </div>
                <span className="text-xs text-neutral-500 font-medium tracking-wide">Seleccionado</span>
              </div>

              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest block mb-2">{product.category}</span>
              <h3 className="text-xl font-display font-bold mb-3">{product.name}</h3>
              
              <div className="space-y-4 mb-8 flex-grow">
                <p className="text-neutral-300 text-sm leading-relaxed">{product.description}</p>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-neutral-400 italic">"{product.whyBest}"</p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-400">{product.features}</p>
                </div>
              </div>

              <a 
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                aria-label={`Ver precio de ${product.name} en Amazon`}
              >
                Ver precio en Amazon <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProfessionalAlarm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    cp: '',
    propiedad: '',
    horario: '',
    prioridad: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const isStaticEnv = window.location.hostname.includes('github.io') || window.location.hostname === 'localhost';
    
    try {
      // Intentamos llamar a la API, pero en GitHub Pages fallará (404)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({
          nombre: '',
          telefono: '',
          cp: '',
          propiedad: '',
          horario: '',
          prioridad: ''
        });
        
        const consentCheckbox = document.getElementById('consent') as HTMLInputElement;
        if (consentCheckbox) consentCheckbox.checked = false;

        setTimeout(() => setIsSent(false), 3000);
      } else {
        throw new Error('API not available or error occurred');
      }
    } catch (error) {
      console.log('Ambiente estático detectado o API no disponible, usando fallback mailto');
      const body = `
Nueva Solicitud de Estudio de Seguridad - TISA
----------------------------------------------
Nombre: ${formData.nombre}
Tel: ${formData.telefono}
CP: ${formData.cp}
Propiedad: ${formData.propiedad}
Horario: ${formData.horario}
Urgencia: ${formData.prioridad}
      `.trim();
      const email = atob(ENCODED_EMAIL);
      const subject = encodeURIComponent("Cita Técnico Especialista: Solicitud de Estudio Gratuito");
      window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setIsSent(true);
      
      setTimeout(() => setIsSent(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="alarma-pro" className="py-24 relative overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover opacity-10" 
          alt="Sistemas de seguridad avanzada y tecnología de vigilancia conectada"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-600/15 border border-blue-600/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                Colaborador Independiente Autorizado de Securitas Direct
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Protección profesional conectada a central receptora</h2>
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                Para quienes el "hazlo tú mismo" no es suficiente. Sistemas blindados con monitorización activa las 24 horas y respuesta inmediata.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Aviso directo a policía",
                  "Monitorización 24/7/365",
                  "Instalación por técnicos homologados",
                  "Respuesta inmediata ante saltos"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-neutral-100">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-950/50 p-8 rounded-[2rem] border border-white/5">
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2 text-center">Reservar cita con un técnico especialista</h3>
              <p className="text-neutral-400 text-xs text-center mb-8">Estudio de seguridad 100% gratuito y sin compromiso</p>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-sm placeholder:text-[13px]"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    placeholder="Teléfono (Ej: 600000000)" 
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-sm placeholder:text-[13px]"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Código Postal" 
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-sm placeholder:text-[13px]"
                    required
                    value={formData.cp}
                    onChange={(e) => setFormData({...formData, cp: e.target.value})}
                  />
                  <select 
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-sm text-neutral-400"
                    required
                    value={formData.propiedad}
                    onChange={(e) => setFormData({...formData, propiedad: e.target.value})}
                  >
                    <option value="" disabled>Tipo de propiedad</option>
                    <option value="piso">Piso</option>
                    <option value="chalet">Chalet / Adosado</option>
                    <option value="negocio">Negocio</option>
                  </select>
                </div>

                <select 
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-sm text-neutral-400"
                  required
                  value={formData.horario}
                  onChange={(e) => setFormData({...formData, horario: e.target.value})}
                >
                  <option value="" disabled>Horario preferido</option>
                  <option value="manana">Mañana (09:00 - 14:00)</option>
                  <option value="tarde">Tarde (14:00 - 21:00)</option>
                </select>
                <select 
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 transition-colors text-sm text-neutral-400"
                  required
                  value={formData.prioridad}
                  onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
                >
                  <option value="" disabled>¿Para cuándo lo necesita?</option>
                  <option value="inmediato">Inmediato</option>
                  <option value="comparando">Solo estoy comparando precios</option>
                </select>

                <div className="flex gap-3 items-start group">
                  <input type="checkbox" id="consent" className="mt-1.5 w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0" required />
                  <label htmlFor="consent" className="text-[10px] text-neutral-400 leading-tight cursor-pointer select-none py-1">
                    Acepto que mis datos sean cedidos a <strong>Securitas Direct</strong> para recibir un estudio de seguridad gratuito y profesional.
                  </label>
                </div>
                
                <div className="space-y-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting || isSent}
                    className={`w-full py-4 rounded-xl font-bold transition-all shadow-xl ${isSent ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'}`}
                    aria-label="Enviar solicitud de estudio de seguridad gratuito"
                  >
                    {isSubmitting ? 'Enviando...' : isSent ? '¡Solicitud enviada!' : 'Solicitar presupuesto gratuito'}
                  </button>
                  
                  {isSent && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-500 text-xs text-center font-bold"
                    >
                      Solicitud enviada correctamente. Un técnico contactará con usted a la brevedad.
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      name: "Manuel R.",
      role: "Comerciante",
      text: "Buscábamos seguridad real para nuestra tienda en el centro. Seguridad TISA nos explicó todo sin rodeos y la instalación fue impecable. Es un alivio tener a expertos que responden de verdad.",
      location: "Negocio Local"
    },
    {
      name: "Carmen G.",
      role: "Propietaria de Vivienda",
      text: "Vivo en una zona de unifamiliares y me preocupaba la seguridad en verano. Me recomendaron el sistema de aviso a policía y ahora me voy de vacaciones sin esa angustia constante. El trato humano marcó la diferencia.",
      location: "Residencia Particular"
    },
    {
      name: "Roberto L.",
      role: "Hogar Conectado",
      text: "Excelente asesoramiento. No intentaron venderme el kit más caro, sino lo que realmente funcionaba para mi piso. La integración con el móvil es genial y me explicaron pacientemente cómo usarlo todo.",
      location: "Piso Familiar"
    }
  ];

  return (
    <section className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display font-bold">Confianza real para tu seguridad</h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Clientes que ya protegen lo que más quieren con nuestro asesoramiento profesional.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-neutral-900/50 border border-white/5 rounded-3xl italic text-neutral-300 flex flex-col justify-between">
               <div>
                 <div className="flex gap-1 mb-6">
                   {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-blue-500 text-blue-500" />)}
                 </div>
                 "{t.text}"
               </div>
               <div className="mt-8 flex items-center gap-4 not-italic border-t border-white/5 pt-6">
                 <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">
                   {t.name[0]}
                 </div>
                 <div>
                   <div className="font-bold text-white">{t.name}</div>
                   <div className="text-xs text-neutral-500">{t.role} • {t.location}</div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSEO = () => {
  const posts = [
    {
      id: "mejor-camara-chalet-2026",
      title: "Mejor cámara para chalet en 2026: Comparativa real",
      excerpt: "Analizamos las 5 cámaras más vendidas y te decimos cuál es la ganadora si buscas calidad/precio.",
      tags: ["Seguridad", "Comparativas"]
    },
    {
      id: "evitar-okupas-guia-segunda-vivienda",
      title: "Cómo evitar okupas: Guía práctica legal y técnica",
      excerpt: "Lo que la ley no te dice y lo que la tecnología sí puede hacer para proteger tu segunda vivienda.",
      tags: ["Alarmas", "Consejos"]
    },
    {
      id: "diferencia-alarma-camara-realidad",
      title: "Diferencia entre alarma y cámara: ¿Qué necesitas realmente?",
      excerpt: "No gastes dinero donde no hace falta. Desmontamos mitos sobre la videovigilancia moderna.",
      tags: ["Información"]
    }
  ];

  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-display font-bold">Escuela de seguridad</h2>
          <Link 
            to="/blog"
            className="text-blue-500 font-bold hover:underline"
          >
            Ver todo el blog
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link 
              key={i} 
              to={`/blog/${post.id}`}
              className="group cursor-pointer"
            >
              <div className="h-60 bg-neutral-900 rounded-3xl mb-6 overflow-hidden border border-white/5">
                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-blue-600/20" />
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-blue-500 border border-blue-500/30 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-blue-500 transition-colors leading-tight">{post.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-950 py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo.webp" 
                alt="Seguridad TISA Logo" 
                className="h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-neutral-400 max-w-sm mb-8 leading-relaxed">
              No vendemos cámaras. Construimos confianza a través de la tecnología y el asesoramiento honesto para que protejas lo que de verdad importa.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.amazon.es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/10"
                aria-label="Ver ofertas en Amazon"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </a>
              <button 
                className="px-6 h-12 rounded-full bg-neutral-900 text-sm font-bold flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/10"
                aria-label="Solicitar presupuesto"
                onClick={() => document.getElementById('alarma-pro')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Presupuesto Gratis
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-6 uppercase text-sm tracking-widest">Secciones</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link to="/#problemas" className="hover:text-white transition-colors">Problemas reales</Link></li>
              <li><Link to="/#soluciones" className="hover:text-white transition-colors">Soluciones por caso</Link></li>
              <li><Link to="/#recomendados" className="hover:text-white transition-colors">Sistemas recomendados</Link></li>
              <li><Link to="/#alarma-pro" className="hover:text-white transition-colors">Alarma profesional</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6 uppercase text-sm tracking-widest">Atención</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li 
                className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors"
                onClick={() => document.getElementById('alarma-pro')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Lock className="w-4 h-4 text-blue-600" /> Consultoría Gratuita
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Presupuesto sin compromiso
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-neutral-900/40 border-y border-white/5 py-4 px-6 mb-12 rounded-2xl">
          <p className="text-neutral-500 text-[11px] text-center leading-relaxed max-w-4xl mx-auto">
            <strong>Aviso de Transparencia:</strong> En calidad de Afiliado de Amazon, Seguridad TISA obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. 
            El precio de los productos es el indicado en la web de Amazon en el momento de la compra. Amazon y el logotipo de Amazon son marcas comerciales de Amazon.com, Inc. o sus filiales.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-xs">
          <span>&copy; 2026 Seguridad TISA. Todos los derechos reservados.</span>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Aviso Legal</span>
            <span className="hover:text-white cursor-pointer transition-colors">Política de Privacidad</span>
            <span className="hover:text-white cursor-pointer transition-colors">Política de Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Seguridad TISA | Alarmas y Cámaras de Vigilancia Profesional</title>
        <meta name="description" content="Especialistas en seguridad. Alarmas profesionales Securitas Direct y sistemas de videovigilancia sin cuotas. Protege tu hogar o negocio hoy." />
        <link rel="canonical" href="https://seguridadeficaz.es" />
        <meta name="keywords" content="alarmas españa, cámaras seguridad, seguridad tisa, securitas direct, alarmas sin cuotas" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Seguridad TISA | Alarmas y Cámaras de Seguridad" />
        <meta property="og:description" content="Expertos en proteger lo que más importa. Sistemas de seguridad avanzados para hogares y empresas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seguridadeficaz.es" />
        <meta property="og:image" content="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp" />
      </Helmet>
      <Hero />
      <Problems />
      <CaseSolutions />
      <SecurityAssessmentSection />
      <RecommendedSystems />
      <ProfessionalAlarm />
      <SocialProof />
      <BlogSEO />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToHashElement />
      <div className="font-sans antialiased bg-neutral-950 text-neutral-50 min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/soluciones/:id" element={<SolutionDetail />} />
          <Route path="/evaluacion" element={<SecurityQuiz />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  
  return null;
}

const ScrollToHashElement = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash, pathname]);

  return null;
};
