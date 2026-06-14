/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, 
  Camera, 
  Bell, 
  Home as HomeIcon, 
  Briefcase, 
  Warehouse, 
  ChevronRight, 
  Search,
  CheckCircle2, 
  Star, 
  MessageSquare, 
  MessageCircle,
  ExternalLink,
  Phone,
  Menu,
  X,
  AlertTriangle,
  Lock,
  Eye,
  Smartphone,
  ArrowRight,
  ChevronDown,
  Award,
  ShieldAlert,
  ShieldCheck,
  Send
} from 'lucide-react';
import { blogPosts } from './data/blogPosts';

const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogPostDetail = React.lazy(() => import('./components/BlogPost'));
const SolutionDetail = React.lazy(() => import('./components/SolutionDetail'));
const SecurityQuiz = React.lazy(() => import('./components/SecurityQuiz'));
const AllSolutions = React.lazy(() => import('./components/AllSolutions'));
const LegalNotice = React.lazy(() => import('./pages/LegalNotice'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'));
const Contact = React.lazy(() => import('./components/ContactPage'));

const RootLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] text-neutral-400">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 rounded-full border-2 border-neutral-800 border-t-blue-500 animate-spin" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500">Cargando...</span>
    </div>
  </div>
);

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
    { name: 'Inicio', href: '/' },
    { name: 'Diagnóstico', href: '/#diagnostico' },
    { name: 'Recomendaciones', href: '/#soluciones' },
    { name: '¿Por qué TISA?', href: '/#experiencia' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-dark py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp" 
            alt="TISA SEGURIDAD" 
            className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-[12px] font-bold text-neutral-400 hover:text-white transition-all uppercase tracking-[0.15em] relative group/link"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full transition-all duration-300 group-hover/link:w-full opacity-0 group-hover/link:opacity-100" />
              </Link>
            ))}
          </div>
          <Link 
            to="/#blog"
            className="shimmer bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center border border-blue-500/50"
            aria-label="Ir al Blog"
          >
            BLOG
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-xl glass hover:bg-white/10" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="absolute top-full left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-white/5 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-lg font-bold text-neutral-300 py-3 hover:text-blue-500 transition-colors border-b border-white/5 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-6">
                <Link 
                  to="/#blog"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center border border-blue-500"
                  aria-label="Ir al Blog móvil"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BLOG
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BrandTicker = () => {
  const brands = [
    { name: "eufy", style: "font-sans font-bold lowercase tracking-tighter" },
    { name: "ring", style: "font-sans font-medium tracking-tight" },
    { name: "tapo", style: "font-sans font-bold italic" },
    { name: "blink", style: "font-sans font-black italic tracking-widest" },
    { name: "Reolink", style: "font-display font-medium tracking-tight" },
    { name: "Nuki", style: "font-sans font-bold uppercase tracking-widest" },
    { name: "Yale", style: "font-serif font-black tracking-tighter" },
    { name: "somfy", style: "font-sans font-medium lowercase" },
    { name: "netatmo", style: "font-sans font-light tracking-wide" },
    { name: "arlo", style: "font-sans font-semibold italic" },
    { name: "EZVIZ", style: "font-sans font-black italic tracking-tighter" },
    { name: "imou", style: "font-sans font-bold" },
    { name: "Aqara", style: "font-serif font-medium tracking-widest" },
    { name: "Xiaomi", style: "font-sans font-bold tracking-tight" },
    { name: "BOSCH", style: "font-sans font-black tracking-widest" },
    { name: "Chuango", style: "font-sans font-bold" },
    { name: "Google Nest", style: "font-sans font-semibold tracking-tight" },
    { name: "LOREX", style: "font-sans font-black uppercase tracking-tighter" },
    { name: "Swann", style: "font-sans font-bold italic" },
    { name: "blurams", style: "font-sans font-medium lowercase" },
  ];

  // Double the brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="w-full mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-10 overflow-hidden relative">
      <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-500/80 mb-1">Tecnologías de confianza</p>
        <div className="w-12 h-0.5 bg-blue-600/30 rounded-full" />
      </div>
      
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      <div className="flex w-full overflow-hidden py-4">
        <motion.div 
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {duplicatedBrands.map((brand, i) => (
            <div 
              key={i} 
              className={`${brand.style} text-2xl md:text-3xl opacity-30 hover:opacity-100 hover:text-blue-400 transition-all cursor-default select-none`}
            >
              {brand.name}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center border-b border-white/5 overflow-hidden bg-grid">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/4eda08cb13506fc51b80c5b0247d396be2bd8416/img/banner.webp"
          alt="Sistemas de seguridad y alarmas profesionales"
          className="w-full h-full object-cover blur-[1px] opacity-20 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Background decoration */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      
      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Shield className="w-3 h-3" />
                Seguridad de nueva generación 2026
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-10 tracking-tighter text-white">
              Encuentra el sistema <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 text-glow">adecuado sin gastar de más</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Análisis de cámaras, alarmas y blindaje profesional. <span className="text-white/60">Te ayudo a proteger tu vivienda o negocio con tecnología efectiva y sin costes ocultos.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/#diagnostico"
                className="shimmer w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-3 group border border-blue-400/30"
                aria-label="Realizar diagnóstico de seguridad"
              >
                Diagnóstico Gratis
                <Search className="w-5 h-5 ml-1 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link 
                to="/#soluciones"
                className="w-full sm:w-auto glass hover:bg-white/10 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 border border-white/5"
                aria-label="Ver recomendaciones de seguridad"
              >
                Ver Recomendaciones
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <BrandTicker />
    </section>
  );
};

const Problems = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Ola de Robos crecientes",
      description: "Los robos en viviendas y locales han aumentado un 15% este año. No esperes a ser el siguiente objetivo.",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
      intensity: "border-red-500/20"
    },
    {
      icon: Shield,
      title: "Amenaza de Okupas",
      description: "La desprotección legal exige una respuesta rápida. Detectar la entrada en los primeros minutos es clave.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      intensity: "border-orange-500/20"
    },
    {
      icon: Eye,
      title: "Falta de control real",
      description: "¿Qué pasa en tu casa o negocio cuando no estás? Necesitas ojos inteligentes, no solo una caja que pita.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      intensity: "border-blue-500/20"
    },
    {
      icon: Lock,
      title: "Sistemas obsoletos",
      description: "Las alarmas antiguas son fáciles de inhibir. Actualízate a tecnología redundante e inatacable hoy mismo.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      intensity: "border-neutral-500/20"
    }
  ];

  return (
    <section id="problemas" className="py-32 relative overflow-hidden scroll-mt-32">
      {/* Immersive background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full glass border border-red-500/20 text-red-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Estado de Alerta Actual
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
              ¿Te preocupa la <br /> <span className="text-blue-500">seguridad?</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl">
              Identificamos las brechas que los criminales aprovechan. No es miedo, es realidad anticipada.
            </p>
          </div>
        </div>
 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {problems.map((problem, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-neutral-950 border ${problem.intensity} aspect-square flex flex-col justify-end transition-all duration-700 hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2`}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={problem.image} 
                  alt={problem.title} 
                  className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
              </div>
              
              <div className="p-4 md:p-8 relative z-10">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl glass border border-white/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shimmer">
                  <problem.icon className="w-4 h-4 md:w-8 md:h-8 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base md:text-2xl font-display font-bold mb-1 md:mb-2 tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-[10px] md:text-sm text-neutral-400 leading-tight md:leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2 md:line-clamp-none">
                  {problem.description}
                </p>
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
    <section id="diagnostico" className="py-32 relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto glass-card rounded-5xl p-10 md:p-20 relative overflow-hidden group">
          {/* Background Decorations */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shimmer">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">Security Assessment Lab</span>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-display font-bold mb-8 tracking-tight leading-[1.1]">
                ¿Es tu hogar un <br className="hidden md:block" />
                <span className="text-blue-500">objetivo fácil?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl">
                Nuestro algoritmo de diagnóstico analiza vulnerabilidades estructurales en tiempo real. Obtén un informe detallado con los <span className="text-blue-400 font-medium">puntos ciegos</span> de tu propiedad en menos de 2 minutos.
              </p>

              <div className="flex items-center gap-2 mb-12 py-2 px-4 rounded-xl bg-blue-600/5 border border-blue-500/10 w-fit">
                <Lock className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none">Procesamiento local 100% privado</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <Link 
                  to="/evaluacion" 
                  className="shimmer w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-blue-600 hover:text-white flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/10 border border-white/20"
                >
                  Iniciar diagnóstico
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"
                    ].map((url, i) => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-neutral-950 overflow-hidden bg-neutral-800">
                        <img 
                          src={url} 
                          alt={`User ${i + 1}`} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Más de 200 recomendaciones durante la fase de prueba</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group/scanner">
              <div className="relative aspect-square glass-dark rounded-5xl p-10 flex flex-col justify-between overflow-hidden border border-white/5">
                {/* Simulated AI Scanner UI */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">System Analysis</div>
                    <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400">ACTIVE</div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 animate-pulse" />
                    <div className="w-32 h-32 rounded-full border border-blue-600/30 flex items-center justify-center relative z-10">
                      <ShieldAlert className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] animate-pulse">Running Scan...</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 glass rounded-xl flex items-center justify-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-red-500' : 'bg-blue-500'} animate-pulse`} />
                    </div>
                  ))}
                </div>

                {/* Decorative scanner line */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
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
  const cases = [
    {
      title: "Para tu vivienda",
      icon: HomeIcon,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
      description: "Blindaje doméstico inteligente. Seguridad invisible que protege a tu familia 24/7 sin convertir tu hogar en una cárcel.",
      features: ["Detección anticipada", "Control de accesos", "Simulación de presencia"]
    },
    {
      title: "Para negocios",
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      description: "Protección activa de activos. Continuidad de negocio y vigilancia inteligente que reduce pérdidas y optimiza tu tranquilidad.",
      features: ["Gestión de aforo", "Análisis de video IA", "Alertas críticas 24h"]
    },
    {
      title: "2das residencias",
      icon: Warehouse,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
      description: "Control total a distancia. Blindaje contra la ocupación y el vandalismo. Mantén tu refugio seguro aunque estés lejos.",
      features: ["Anti-ocupación Real", "Aviso corte eléctrico", "Verificación rápida"]
    }
  ];

  const Icon0 = cases[0].icon;
  const Icon1 = cases[1].icon;
  const Icon2 = cases[2].icon;

  const btnTexts = [
    "Ver Catálogo Vivienda",
    "Ver Catálogo Negocios",
    "Ver Catálogo Residencias"
  ];

  return (
    <section id="soluciones" className="py-32 relative bg-grid scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            Blindaje estratégico, <br /> <span className="text-blue-500">tranquilidad real</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl">
            Mi enfoque no es vender cajas con sensores, sino crear un ecosistema de protección basado en inteligencia y estrategia real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Vivienda */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-square md:aspect-auto md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border border-white/5 hover:border-blue-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <img 
              src={cases[0].image} 
              alt={cases[0].title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-4 md:mb-6 shimmer">
                <Icon0 className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{cases[0].title}</h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-md line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                {cases[0].description}
              </p>
              <div className="hidden lg:flex flex-wrap gap-3 mb-8">
                {cases[0].features.map(f => (
                  <span key={f} className="px-4 py-2 rounded-full glass border border-white/10 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    {f}
                  </span>
                ))}
              </div>
              <Link to="/soluciones/vivienda" className="inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-400 group/btn hover:text-white transition-all">
                {btnTexts[0]}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-3 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Negocios */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-square md:aspect-auto md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border border-white/5 hover:border-blue-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <img 
              src={cases[1].image} 
              alt={cases[1].title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-4 md:mb-6 shimmer">
                <Icon1 className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{cases[1].title}</h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-md line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                {cases[1].description}
              </p>
              <div className="hidden lg:flex flex-wrap gap-3 mb-8">
                {cases[1].features.map(f => (
                  <span key={f} className="px-4 py-2 rounded-full glass border border-white/10 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    {f}
                  </span>
                ))}
              </div>
              <Link to="/soluciones/negocios" className="inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-400 group/btn hover:text-white transition-all">
                {btnTexts[1]}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-3 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: 2das Residencias */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-square md:aspect-auto md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border border-white/5 hover:border-blue-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <img 
              src={cases[2].image} 
              alt={cases[2].title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-4 md:mb-6 shimmer">
                <Icon2 className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{cases[2].title}</h3>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-md line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                {cases[2].description}
              </p>
              <div className="hidden lg:flex flex-wrap gap-3 mb-8">
                {cases[2].features.map(f => (
                  <span key={f} className="px-4 py-2 rounded-full glass border border-white/10 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                    {f}
                  </span>
                ))}
              </div>
              <Link to="/soluciones/residencias" className="inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-400 group/btn hover:text-white transition-all">
                {btnTexts[2]}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-3 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  const [expExpanded, setExpExpanded] = useState(false);
  const experiences = [
    {
      period: "2019 - 2023",
      role: "Ingeniero de Proyectos",
      company: "Almacenes Universales S.A",
      modality: "Híbrido",
      description: "Diseño e implementación de sistemas integrales: Videovigilancia, Anti-intrusión, Detección de Incendios y Control de Accesos."
    },
    {
      period: "2017 - 2019",
      role: "Líder de Instalación",
      company: "Almacenes Universales S.A",
      modality: "Presencial",
      description: "Dirección técnica en campo. Especialista en diagnóstico avanzado y puesta en marcha de sistemas complejos. Comissioning, post-venta."
    }
  ];

  return (
    <section id="experiencia" className="py-24 relative bg-neutral-950 overflow-hidden scroll-mt-32">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Photo & Story */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full glass border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-6">
                  Trayectoria Real
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
                  Por qué confiar <br />
                  <span className="text-blue-500">en TISA Seguridad</span>
                </h2>
                
                <a 
                  href="https://www.linkedin.com/in/mbfredys/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative inline-block mb-10 group text-left"
                >
                  <div className="absolute -inset-4 bg-blue-600/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20 rounded-2xl glass border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                       <img 
                         src="https://raw.githubusercontent.com/MbFredys/mbfredys.github.io/1cf4ac79438449a681739dc196ab0b0b4e40d845/images/perfil-7.webp" 
                         alt="Fredys Matos Borges" 
                         className="w-full h-full object-cover object-top"
                       />
                       <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-600/20 to-transparent" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-white tracking-tight">Fredys Matos Borges</div>
                      <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Hardware Engineer • Ex Security Systems Project Engineer</div>
                    </div>
                  </div>
                </a>

                <p className="text-base md:text-xl text-neutral-300 leading-relaxed font-light italic border-l-2 border-blue-600 pl-6 mb-8">
                  "+6 años trabajando con sistemas reales de CCTV, intrusión, incendios y seguridad electrónica. Después de años diseñando, instalando y diagnosticando fallos, decidí crear TISA para ayudar a elegir equipos confiables sin marketing engañoso."
                </p>

                <div className="p-6 glass-dark rounded-3xl border border-white/5 space-y-4">
                  <h3 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Qué me diferencia
                  </h3>
                  <p className="text-sm md:text-lg text-neutral-400 leading-relaxed font-light">
                    No hago reviews genéricas. Analizo productos desde la <span className="text-white font-medium italic">experiencia real</span>, fallos comunes y fiabilidad técnica. Solo recomiendo sistemas que he probado o investigado a fondo.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right side: Experience list */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="p-6 md:p-8 glass rounded-3xl md:rounded-4xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
                
                <h3 
                  className={`text-lg font-display font-bold tracking-tight flex items-center justify-between cursor-pointer md:cursor-default group/h3 transition-all duration-300 ${expExpanded ? 'mb-10 text-blue-400' : 'mb-0 md:mb-10 text-white'}`}
                  onClick={() => setExpExpanded(!expExpanded)}
                >
                  <div className="flex items-center gap-3">
                    <Award className={`w-5 h-5 transition-colors ${expExpanded ? 'text-blue-600' : 'text-blue-500'}`} />
                    Experiencia Consolidada
                  </div>
                  <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform duration-300 md:hidden ${expExpanded ? 'rotate-180' : ''}`} />
                </h3>
                
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: expExpanded ? 'auto' : 0,
                    opacity: expExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden md:!h-auto md:!opacity-100"
                >
                  <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10 pb-4 md:pb-0">
                    {experiences.map((exp, i) => (
                      <div key={i} className="relative pl-12 group/item">
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full glass border border-white/10 flex items-center justify-center z-10 group-hover/item:bg-blue-600 transition-colors duration-500 shadow-xl group-hover/item:shadow-blue-600/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/item:bg-white" />
                        </div>
                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-3">
                           {exp.period}
                           <span className="w-10 h-px bg-white/5" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-display font-bold text-white mb-1 tracking-tight group-hover/item:text-blue-400 transition-colors">{exp.role}</h4>
                        <div className="text-[11px] font-bold text-neutral-500 mb-4 uppercase tracking-tighter">{exp.company} • {exp.modality}</div>
                        <p className="text-neutral-400 text-[13px] md:text-sm leading-relaxed font-light group-hover/item:text-neutral-300 transition-colors">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 glass-dark rounded-3xl border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <div className="text-4xl font-display font-bold text-white mb-1 group-hover:text-blue-500 transition-colors">+6</div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Años de Ingeniería</div>
                 </div>
                 <div className="p-6 glass-dark rounded-3xl border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <div className="text-4xl font-display font-bold text-white mb-1 group-hover:text-blue-500 transition-colors">100%</div>
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Criterio Técnico</div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogSEO = () => {
  const posts = [
    {
      id: "evitar-okupas-guia-segunda-vivienda",
      title: "Cómo evitar okupas: Guía definitiva 2026",
      excerpt: "La tecnología que evita meses de juicios y costes legales en viviendas vacías.",
      tags: ["Guías Prácticas"]
    },
    {
      id: "mejor-camara-exterior-wifi-2026",
      title: "Mejor cámara exterior WiFi: Comparativa real",
      excerpt: "Analizamos las cámaras más vendidas y te decimos cuál es la ganadora real.",
      tags: ["Comparativas"]
    },
    {
      id: "errores-comunes-instalacion-alarmas",
      title: "Errores críticos al instalar tu sistema",
      excerpt: "Evita los fallos que los ladrones profesionales ya conocen y aprovechan.",
      tags: ["Errores Comunes"]
    },
    {
      id: "coste-oculto-robo-hogar",
      title: "Coste oculto de un robo: Más allá de lo robado",
      excerpt: "Pensamos que un robo cuesta solo el laptop o la TV. El impacto psicológico y operacional cuesta mucho más.",
      tags: ["Opiniones Técnicas"]
    },
    {
      id: "alarmas-cuota-mensual-vale-la-pena",
      title: "¿Alarmas con cuotas valen la pena? Análisis honesto",
      excerpt: "Análisis técnico de los equipos y servicios de alarmas con cuotas frente a alternativas.",
      tags: ["Opiniones Técnicas"]
    },
    {
      id: "guia-configuracion-cctv-segura",
      title: "Guía: Configura tu CCTV de forma profesional",
      excerpt: "Paso a paso para configurar grabaciones y alertas al móvil sin errores.",
      tags: ["Guías Prácticas"]
    }
  ];

  return (
    <section id="blog" className="py-32 bg-grid scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-24">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Aprende a proteger <br /><span className="text-blue-500">mejor tu hogar o negocio</span></h2>
            <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl">Domina la tecnología de seguridad con mi experiencia real. El conocimiento es la primera capa de blindaje.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              {["Guías Prácticas", "Comparativas", "Errores Comunes", "Opiniones Técnicas"].map(cat => (
                <span key={cat} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-800 px-4 py-2 rounded-xl group-hover:border-blue-500 transition-colors">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <Link 
            to="/blog"
            className="group inline-flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs py-6 px-10 glass rounded-3xl hover:bg-blue-600 transition-all shadow-2xl"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => {
            const matchingPost = blogPosts.find(bp => bp.id === post.id);
            const imageSrc = matchingPost?.image || "";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="h-64 glass-card rounded-4xl mb-8 overflow-hidden relative border border-white/5 shadow-2xl">
                    {/* Background principal image with clarify and scale hover transitions */}
                    {imageSrc && (
                      <img 
                        src={imageSrc} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Decorative overlay background/radial highlight */}
                    <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-950/20 transition-colors duration-700" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)] transition-colors duration-700" />
                    
                    {/* Escudo y Cámara centrados por encima de la imagen */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative scale-100 group-hover:scale-110 transition-transform duration-1000">
                         <Shield className="w-24 h-24 text-blue-500/10 group-hover:text-blue-500/25 transition-colors duration-700" />
                         <Camera className="w-10 h-10 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[2px] opacity-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-700 delay-100" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-bold uppercase tracking-[0.2em] glass border border-blue-500/20 text-blue-400 px-3 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight tracking-tight">{post.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-sm font-light line-clamp-2 group-hover:text-neutral-300 transition-colors">{post.excerpt}</p>
                  <div className="mt-8 flex items-center gap-3 text-white font-bold uppercase tracking-[0.2em] text-[9px] group-hover:text-blue-500 transition-all">
                    <div className="w-8 h-px bg-blue-600/30 group-hover:w-16 transition-all" />
                    Leer artículo
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyType: 'residencial',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contacto enviado:', formData);
    setIsSent(true);
    setFormData({ name: '', email: '', propertyType: 'residencial', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-neutral-950/40 border-t border-white/5 scroll-mt-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full glass border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-6">
              ¿Hablamos de tu Seguridad?
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">
              Solicita un <span className="text-blue-500">Diseño Técnico</span> gratuito
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light">
              Analizo tu caso y te propongo una solución óptima y objetiva sin ganchos comerciales ni suscripciones obligatorias.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl"
          >
            {isSent && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-neutral-950/95 z-20 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/30">
                  <CheckCircle2 className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">¡Mensaje enviado con éxito!</h3>
                <p className="text-neutral-400 max-w-md mx-auto font-light">
                  He recibido tus datos correctamente. Revisaré la información y te contactaré personalmente en un plazo de 24-48 horas.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 font-display">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Tu Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all text-sm font-light"
                    placeholder="Ej: Manuel Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Tu Email de contacto</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all text-sm font-light"
                    placeholder="Ej: manuel@empresa.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Tipo de Propiedad a proteger</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { val: 'residencial', label: 'Residencial / Vivienda', icon: HomeIcon },
                    { val: 'negocio', label: 'Negocio / Almacén', icon: Warehouse },
                    { val: 'segunda-vivienda', label: 'Segunda Residencia', icon: Briefcase }
                  ].map(item => {
                    const IconComp = item.icon;
                    const isSelected = formData.propertyType === item.val;
                    return (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setFormData({...formData, propertyType: item.val})}
                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all text-left text-sm font-medium ${
                          isSelected 
                            ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-600/10' 
                            : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/10 hover:bg-white/[0.04]'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-neutral-500'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest px-1">Describe tu necesidad o dudas del sistema</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all resize-none text-sm font-light"
                  placeholder="Ej: Quiero una comparativa de cámaras PoE locales para un chalet, o dudo si instalar alarma sin cuotas..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
                <p className="text-[10px] text-neutral-500 leading-relaxed max-w-md italic">
                  Al solicitar este contacto gratuito, trataremos tus datos de forma confidencial y exclusivamente para resolver tu consulta técnica, conforme a nuestra política de privacidad.
                </p>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-8 h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Enviar Solicitud
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-32 pb-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-20 mb-24">
          <div className="md:col-span-5">
            <div className="flex items-center mb-10">
              <img 
                src="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo.webp" 
                alt="TISA SEGURIDAD" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xl text-neutral-400 max-w-sm mb-12 leading-relaxed font-light">
              No solo analizo equipos. Diseño <span className="text-white font-medium">fortalezas digitales</span> y asesoro con honestidad absoluta.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/#soluciones"
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl group"
                aria-label="Ver soluciones de blindaje"
              >
                <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                to="/evaluacion"
                className="px-10 h-14 rounded-2xl bg-white text-black text-sm font-bold uppercase tracking-widest flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98]"
                aria-label="Ir al diagnóstico"
              >
                Diagnóstico
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-display font-bold mb-10 uppercase text-xs tracking-[0.3em] text-blue-500">Navegación</h4>
            <ul className="space-y-6 text-neutral-500 text-sm font-medium">
              <li><Link to="/#problemas" className="hover:text-white transition-colors">Vulnerabilidades</Link></li>
              <li><Link to="/servicios-de-blindaje" className="hover:text-white transition-colors">Catálogo Completo</Link></li>
              <li><Link to="/#soluciones" className="hover:text-white transition-colors">Sistemas Recomendados</Link></li>
              <li><Link to="/#blog" className="hover:text-white transition-colors">Blog Técnico</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold mb-10 uppercase text-xs tracking-[0.3em] text-blue-500">Servicios</h4>
            <ul className="space-y-6 text-neutral-500 text-sm font-medium">
              <li>
                <Link to="/evaluacion" className="flex items-center gap-3 hover:text-white transition-colors font-medium">
                  Diagnóstico de Seguridad
                </Link>
              </li>
              <li>
                <Link to="/soluciones/negocios" className="flex items-center gap-3 hover:text-white transition-colors font-medium col-span-1">
                  Blindaje Negocios
                </Link>
              </li>
              <li>
                <Link to="/soluciones/vivienda" className="flex items-center gap-3 hover:text-white transition-colors font-medium">
                  Protección Residencial
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-bold mb-10 uppercase text-xs tracking-[0.3em] text-blue-500">Legal y Soporte</h4>
             <ul className="space-y-6 text-neutral-500 text-sm font-medium">
               <li><Link to="/aviso-legal" className="hover:text-blue-400 transition-colors">Aviso Legal</Link></li>
               <li><Link to="/politica-de-privacidad" className="hover:text-blue-400 transition-colors">Política de Privacidad</Link></li>
               <li><Link to="/politica-de-cookies" className="hover:text-blue-400 transition-colors">Política de Cookies</Link></li>
               <li><Link to="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
             </ul>
          </div>
        </div>
        
        <div className="bg-neutral-900/40 rounded-3xl py-10 px-10 mb-16 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF9900] transition-all duration-500 group-hover:w-full group-hover:bg-[#FF9900]/[0.03]" />
          <p className="text-neutral-400 text-xs text-center leading-relaxed max-w-4xl mx-auto relative z-10 italic">
            <span className="text-[#FF9900] font-black block mb-4 tracking-[0.3em] uppercase text-[10px] not-italic">Disclaimer Afiliados Amazon</span>
            "Fredys Matos Borges participa en el Programa de Afiliados de Amazon EU, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es. Como Afiliado de Amazon, percibo ingresos por las compras adscritas que cumplen los requisitos aplicables."
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 pt-12 text-neutral-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <span>&copy; {new Date().getFullYear()} TISA SEGURIDAD. BLINDAJE TECNOLÓGICO.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <Link to="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
            <Link to="/politica-de-privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <Link to="/politica-de-cookies" className="hover:text-white transition-colors">Cookies</Link>
            <div className="h-4 w-px bg-white/5 hidden md:block" />
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all flex items-center gap-2 group">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all flex items-center gap-2 group">
              LinkedIn
            </a>
            <a href="mailto:contact@tisaseguridad.shop" className="shimmer bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-6 py-2.5 rounded-xl border border-blue-500/20 transition-all">
              Contacto Directo
            </a>
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
        <title>TISA SEGURIDAD | Alarmas y Cámaras de Vigilancia Profesional</title>
        <meta name="description" content="Especialistas en seguridad. Sistemas de videovigilancia y blindaje profesional. Protege tu hogar o negocio con asesoramiento experto." />
        <link rel="canonical" href="https://tisaseguridad.shop" />
        <meta name="keywords" content="alarmas españa, cámaras seguridad, seguridad tisa, securitas direct, alarmas sin cuotas" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TISA SEGURIDAD | Alarmas y Cámaras de Seguridad" />
        <meta property="og:description" content="Especialista en proteger lo que más importa. Sistemas de seguridad avanzados para hogares y empresas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tisaseguridad.shop" />
        <meta property="og:image" content="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp" />
      </Helmet>
      <Hero />
      <Problems />
      <SecurityAssessmentSection />
      <RecommendedSystems />
      <TrustSection />
      <BlogSEO />
      <ContactFormSection />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToHashElement />
      <div className="font-sans antialiased bg-[#050505] text-neutral-50 min-h-screen relative overflow-x-hidden">
        {/* Absolute positional glows for the entire page atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-blue-900/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Navbar />
          
          <React.Suspense fallback={<RootLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diagnostico" element={<Home />} />
              <Route path="/soluciones" element={<Home />} />
              <Route path="/escuela" element={<Home />} />
              <Route path="/blog-seccion" element={<Home />} />
              <Route path="/experiencia" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/soluciones/:id" element={<SolutionDetail />} />
              <Route path="/servicios-de-blindaje" element={<AllSolutions />} />
              <Route path="/evaluacion" element={<SecurityQuiz />} />
              <Route path="/aviso-legal" element={<LegalNotice />} />
              <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/politica-de-cookies" element={<CookiePolicy />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </React.Suspense>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
}

const ScrollToHashElement = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // Determine the scroll target: either the hash or the path if it matches a section
    const targetId = hash ? hash.replace('#', '') : pathname.replace('/', '');
    
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Wait for all components and images to be potentially rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 400); // Slightly more delay to be safer
        return () => clearTimeout(timer);
      }
    }
  }, [hash, pathname]);

  return null;
};
