
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LegalPageProps {
  type: 'privacidad' | 'cookies' | 'disclaimer';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const content = {
    privacidad: {
      title: 'Política de Privacidad',
      icon: Shield,
      text: `
        ### Responsable del Tratamiento
        Fredys Matos Borges a través de TISA Seguridad es el responsable del tratamiento de tus datos personales.

        ### Finalidad
        Tus datos se utilizan exclusivamente para:
        1. Proporcionar el diagnóstico de seguridad solicitado.
        2. Responder consultas a través del formulario de contacto.
        3. Enviar comunicaciones sobre actualizaciones de seguridad si lo solicitas.

        ### Conservación
        Los datos se conservarán el tiempo estrictamente necesario para cumplir con la finalidad para la que fueron recabados.

        ### Derechos
        Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición enviando un correo a contact@tisaseguridad.shop.
      `
    },
    cookies: {
      title: 'Política de Cookies',
      icon: Eye,
      text: `
        ### ¿Qué son las cookies?
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo para mejorar la experiencia de usuario.

        ### Cookies utilizadas
        - **Técnicas**: Esenciales para el funcionamiento del diagnóstico y navegación.
        - **Personalización**: Permiten recordar tus preferencias (como el idioma o resultados del test).
        - **Analíticas**: (Opcional) Para entender cómo se usa la web y mejorar el contenido.

        ### Gestión
        Puedes desactivar las cookies en cualquier momento desde la configuración de tu navegador. TISA Seguridad respeta la configuración de 'Do Not Track'.
      `
    },
    disclaimer: {
      title: 'Aviso de Afiliados',
      icon: Lock,
      text: `
        ### Transparencia ante todo
        En cumplimiento con la normativa de transparencia y defensa del consumidor:

        Fredys Matos Borges participa en el **Programa de Afiliados de Amazon EU**, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es.

        ### ¿Cómo funciona?
        Cuando haces clic en un enlace de producto de Amazon y realizas una compra, Amazon me otorga una pequeña comisión.

        ### ¿Te cuesta más?
        **No.** El precio del producto es el mismo para ti. Esta comisión ayuda a mantener este sitio web, permitiéndome seguir analizando sistemas de seguridad de forma independiente y sin cuotas para el usuario.

        Mi criterio técnico es independiente. No recomiendo productos por la comisión, sino por su fiabilidad en mis pruebas de campo.
      `
    }
  };

  const current = content[type];

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>{current.title} | TISA Seguridad</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigate(-1)} 
          className="group inline-flex items-center gap-3 text-neutral-500 font-bold mb-16 hover:text-white transition-all uppercase tracking-widest text-[10px] cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-5xl border border-white/5 p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-2xl">
              <current.icon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">{current.title}</h1>
          </div>

          <div className="space-y-10 text-neutral-400 leading-relaxed font-light">
            {current.text.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('###')) {
                return <h3 key={i} className="text-xl font-display font-bold text-white pt-6 tracking-tight">{trimmed.replace('###', '')}</h3>;
              }
              if (trimmed.startsWith('-')) {
                return <li key={i} className="ml-4 list-disc">{trimmed.replace('-', '').trim()}</li>;
              }
              if (trimmed === '') return null;
              return <p key={i}>{trimmed}</p>;
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPage;
