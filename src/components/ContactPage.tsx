
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, MessageCircle, ShieldCheck, ArrowRight, Linkedin, Instagram } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>Contacto | TISA Seguridad</title>
        <meta name="description" content="Contacta con Fredys Matos para consultas sobre sistemas de seguridad, auditorías y asesoramiento técnico profesional en España." />
        <link rel="canonical" href="https://tisaseguridad.shop/contacto" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contacto | TISA Seguridad" />
        <meta property="og:description" content="Contacta con Fredys Matos para consultas sobre sistemas de seguridad, auditorías y asesoramiento técnico profesional en España." />
        <meta property="og:url" content="https://tisaseguridad.shop/contacto" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/4eda08cb13506fc51b80c5b0247d396be2bd8416/img/banner.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto | TISA Seguridad" />
        <meta name="twitter:description" content="Contacta con Fredys Matos para consultas sobre sistemas de seguridad, auditorías y asesoramiento técnico profesional en España." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/websprintt/Seguridad-TISA/4eda08cb13506fc51b80c5b0247d396be2bd8416/img/banner.webp" />
      </Helmet>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full glass border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-8">
              Enlace Directo
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tighter">
              Resolvamos tus dudas <br />
              <span className="text-blue-500">de seguridad</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed font-light max-w-xl italic">
              "Mi objetivo es compartir mi opinión técnica objetiva. Si tienes dudas sobre qué equipos elegir en mis comparativas o cómo autogestionar el sistema de tu casa con Amazon, escríbeme."
            </p>

            <div className="space-y-6">
              <a 
                href="mailto:contact@tisaseguridad.shop"
                className="flex items-center gap-6 p-6 md:p-8 glass rounded-3xl md:rounded-4xl border border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Email Profesional</div>
                  <div className="text-lg md:text-2xl font-display font-bold text-white tracking-tight">contact@tisaseguridad.shop</div>
                </div>
              </a>

              <a 
                href="https://wa.me/34742090991"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 md:p-8 glass rounded-3xl md:rounded-4xl border border-white/5 hover:border-green-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-600/10 border border-green-600/20 flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">WhatsApp Directo (Consulta Rápida)</div>
                  <div className="text-lg md:text-2xl font-display font-bold text-white tracking-tight">+34 742 090 991</div>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-6">
                <a 
                  href="https://linkedin.com/in/mbfredys/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col gap-6 p-8 glass rounded-4xl border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">LinkedIn</div>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col gap-6 p-8 glass rounded-4xl border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center transition-transform group-hover:scale-110">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Instagram</div>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold tracking-tight">Compromiso TISA</h2>
            </div>

            <ul className="space-y-10">
              <li className="flex gap-6">
                <div className="w-6 h-6 rounded-full glass border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 tracking-tight">Soporte y Consultas de Equipos</h4>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">Priorizo consultas técnicas sobre los dispositivos y guías de configuración recomendados en el blog y el test.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-6 h-6 rounded-full glass border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 tracking-tight">Opinión 100% Independiente</h4>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">No tengo contratos de exclusividad con marcas de alarmas o instaladoras. Mi sugerencia se basa exclusivamente en lo mejor para tu caso.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-6 h-6 rounded-full glass border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 tracking-tight">Enlaces de Afiliados de Amazon</h4>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">Los productos recomendados redirigen de manera transparente a Amazon. Al adquirir tus equipos a través de ellos, apoyas mi blog sin costes adicionales para ti.</p>
                </div>
              </li>
            </ul>

            <div className="mt-20 p-8 glass rounded-3xl border border-white/5 text-center">
              <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-6 italic">¿Solo quieres ver qué sistemas recomiendo?</p>
              <a 
                href="/#soluciones" 
                className="inline-flex items-center gap-3 text-blue-500 font-bold hover:text-white transition-all uppercase tracking-[0.2em] text-[10px]"
              >
                Explorar Soluciones <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
