import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ShoppingCart, ExternalLink, ShieldCheck, Zap, Info, Award } from 'lucide-react';
import { solutionCategories } from '../data/solutions';

const SolutionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const category = solutionCategories.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!category) {
    return (
      <div className="pt-32 pb-20 bg-neutral-950 min-h-screen text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Categoría no encontrada</h1>
          <Link to="/" className="text-blue-500 font-bold hover:underline">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <Helmet>
        <title>{category.title} | Soluciones de Seguridad TISA</title>
        <meta name="description" content={category.description} />
      </Helmet>
      
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 font-bold mb-12 hover:gap-3 transition-all">
          <ChevronLeft className="w-5 h-5" /> Volver al Inicio
        </Link>
        
        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{category.title}</h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-neutral-900/50 rounded-[2.5rem] border border-white/5 p-6 flex flex-col items-center hover:border-blue-500/30 transition-all group shadow-2xl shadow-black"
            >
              <div className="w-full aspect-square bg-neutral-950 rounded-3xl overflow-hidden mb-6 relative border border-white/5">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                    <Award className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Calidad TISA</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-medium">Recomendado</span>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3">{product.name}</h3>
                
                <div className="flex items-center gap-1.5 text-blue-500 mb-4 font-mono font-bold text-sm">
                  <ShoppingCart className="w-4 h-4" /> 
                  <span className="text-neutral-500 font-normal">Amazon.es</span>
                </div>
                <p className="text-neutral-400 text-sm mb-8 leading-relaxed h-[4.5rem] overflow-hidden line-clamp-3">
                  {product.description}
                </p>
                
                <a 
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-neutral-950 hover:bg-neutral-200 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/5 active:scale-95"
                >
                  Ver precio en Amazon <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-neutral-900 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-500 font-bold mb-4 uppercase tracking-widest text-xs">
                <ShieldCheck className="w-4 h-4" /> Instalación Profesional
              </div>
              <h2 className="text-3xl font-display font-bold mb-6">¿Prefieres un sistema llave en mano?</h2>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Si no quieres complicaciones con la instalación o buscas un sistema con conexión directa a la policía, nuestro estudio gratuito es la mejor opción en toda España.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/#alarma-pro" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" /> Solicitar Estudio Gratis
                </Link>
                <div className="flex items-center gap-3 px-6 py-4 text-sm text-neutral-400 bg-black/30 rounded-2xl border border-white/5">
                  <Info className="w-4 h-4 text-blue-500" /> Sin compromiso
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-32 bg-neutral-800 rounded-3xl animate-pulse" />
                  <div className="h-48 bg-neutral-950 rounded-3xl" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-48 bg-neutral-950 rounded-3xl" />
                  <div className="h-32 bg-neutral-800 rounded-3xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetail;
