import React from 'react';
import { motion } from 'motion/react';
import { Database, Info, ExternalLink } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-8 text-blue-500">
            <Database className="w-8 h-8" />
            <h1 className="text-4xl font-display font-bold text-white">Política de Cookies</h1>
          </div>

          <div className="space-y-8 text-neutral-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">¿Qué es una cookie?</h2>
              <p>
                Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Cookies utilizadas en este sitio</h2>
              <div className="space-y-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-blue-400 font-bold mb-2">Cookies Técnicas</h3>
                  <p className="text-sm italic">Necesarias para el funcionamiento básico del sitio y la navegación.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-blue-400 font-bold mb-2">Cookies de Afiliación (Amazon)</h3>
                  <p className="text-sm italic">Utilizadas para identificar que un usuario ha llegado a Amazon desde un enlace de este sitio, permitiendo gestionar la comisión correspondiente sin coste para el usuario.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-blue-400 font-bold mb-2">Cookies de Análisis</h3>
                  <p className="text-sm italic">Como Google Analytics, para entender cómo interactúan los usuarios con el contenido y mejorar la web.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Desactivación de cookies</h2>
              <p>
                Usted puede restringir, bloquear o borrar las cookies de este sitio web utilizando su navegador. Cada navegador tiene una configuración distinta:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-sm">
                <li>Internet Explorer: Herramientas &rarr; Opciones de Internet &rarr; Privacidad &rarr; Configuración.</li>
                <li>Firefox: Herramientas &rarr; Opciones &rarr; Privacidad &rarr; Historial &rarr; Configuración Personalizada.</li>
                <li>Chrome: Configuración &rarr; Mostrar opciones avanzadas &rarr; Privacidad &rarr; Configuración de contenido.</li>
                <li>Safari: Preferencias &rarr; Seguridad.</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
