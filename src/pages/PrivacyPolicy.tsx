import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Eye, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <Helmet>
        <title>Política de Privacidad | TISA Seguridad</title>
        <meta name="description" content="Información detallada sobre el tratamiento de tus datos personales, cumplimiento del RGPD y privacidad en TISA." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://tisaseguridad.shop/politica-de-privacidad" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-8 text-blue-500">
            <Lock className="w-8 h-8" />
            <h1 className="text-4xl font-display font-bold text-white">Política de Privacidad</h1>
          </div>

          <div className="space-y-8 text-neutral-400 leading-relaxed">
            <p>
              Esta Política de Privacidad describe cómo se recogen, utilizan y comparten sus datos personales cuando visita este sitio web. Cumplimos estrictamente con el Reglamento General de Protección de Datos (RGPD - UE 2016/679).
            </p>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Responsable del tratamiento</h2>
              <ul className="space-y-2">
                <li><span className="text-white font-medium">Responsable:</span> Fredys Matos Borges / TISA</li>
                <li><span className="text-white font-medium">Email:</span> contact@tisaseguridad.shop</li>
                <li><span className="text-white font-medium">Web:</span> https://tisaseguridad.shop</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Datos que recogemos</h2>
              <p>Este sitio puede recoger datos personales a través de:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Formularios de contacto: Nombre y correo electrónico facilitados voluntariamente.</li>
                <li>Cookies de análisis: Datos de navegación anónimos a través de tecnologías de seguimiento estándar.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Finalidad del tratamiento</h2>
              <p>Los datos se utilizan únicamente para:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Responder a sus consultas o solicitudes de información.</li>
                <li>Mejorar la experiencia del usuario y analizar el rendimiento de los artículos.</li>
                <li>Gestionar los enlaces de afiliación de Amazon.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Base legal</h2>
              <p>Tratamos sus datos basándonos en el <span className="text-blue-400">consentimiento del usuario</span> expresado al navegar por la web o al enviarnos un mensaje de contacto.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Enlaces de Afiliación</h2>
              <p>
                Este sitio contiene enlaces de afiliado de Amazon. Al hacer clic en estos enlaces, Amazon puede instalar cookies en su navegador para realizar el seguimiento de las ventas. Esto no tiene ningún enlace de coste adicional para usted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Sus Derechos</h2>
              <p>
                Como usuario, tiene derecho a acceder, rectificar, limitar el tratamiento o suprimir sus datos personales en cualquier momento. Para ejercer estos derechos, puede escribir a <span className="text-blue-500 font-bold">contact@tisaseguridad.shop</span> adjuntando una copia de su DNI.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
