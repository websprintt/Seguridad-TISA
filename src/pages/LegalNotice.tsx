import React from 'react';
import { motion } from 'motion/react';
import { Shield, Scale, Info } from 'lucide-react';

const LegalNotice: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-4 mb-8 text-blue-500">
            <Scale className="w-8 h-8" />
            <h1 className="text-4xl font-display font-bold text-white">Aviso Legal</h1>
          </div>

          <div className="space-y-8 text-neutral-400 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Datos del titular</h2>
              <p>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa que este sitio web es propiedad de:
              </p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-white font-medium">Nombre:</span> Fredys Matos Borges</li>
                <li><span className="text-white font-medium">Sitio web:</span> https://tisaseguridad.shop</li>
                <li><span className="text-white font-medium">Email:</span> contact@tisaseguridad.shop</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Objeto de la web</h2>
              <p>
                Este sitio web tiene como finalidad ofrecer contenido informativo, análisis técnicos, comparativas reales y recomendaciones de productos tecnológicos y sistemas de seguridad. El contenido está basado en mi experiencia técnica como ingeniero y profesional del sector.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Afiliación Amazon</h2>
              <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl">
                <p className="text-blue-200 italic">
                  "Este sitio participa en el Programa de Afiliados de Amazon EU, un programa de publicidad para afiliados diseñado para ofrecer a los sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es."
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Propiedad Intelectual</h2>
              <p>
                Todos los derechos de propiedad intelectual del contenido de esta página web y su diseño gráfico son titularidad exclusiva de Fredys Matos Borges, quedando prohibida su reproducción, distribución o comunicación pública sin autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Responsabilidad</h2>
              <p>
                El titular no se hace responsable de los productos, servicios o contenido de terceros enlazados desde esta web. Las opiniones vertidas en los artículos son responsabilidad de sus autores y no constituyen asesoramiento legal vinculante.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalNotice;
