import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ShoppingCart, ExternalLink, ShieldCheck, Zap, Info, Award, ChevronDown, CheckCircle2 } from 'lucide-react';
import { solutionCategories, SolutionProduct } from '../data/solutions';
import ShareButtons from './ShareButtons';
import { getAssetPath } from '../utils/assets';

const ProductCard = ({ product, idx }: { product: SolutionProduct; idx: number }) => {
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);

  // Determinar si la imagen del producto tiene un fondo oscuro o claro.
  // Por defecto, como todas las imágenes actuales de Amazon vienen sobre fondo blanco/claro,
  // asumimos que el fondo de la imagen es claro (isDarkImage = false) para mostrar la etiqueta oscura.
  // Si añades algún producto futuro con imagen de fondo oscuro, puedes añadir su ID aquí.
  const isDarkImage = [].includes(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="glass-dark rounded-5xl border border-white/5 p-8 flex flex-col items-center hover:border-blue-500/30 transition-all duration-500 group shadow-2xl shadow-black h-full"
    >
      <div className="w-full aspect-square bg-white rounded-4xl overflow-hidden mb-10 relative border border-white/5">
        <img 
          src={getAssetPath(product.image)} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6">
          <span className={`backdrop-blur-md text-[9px] font-bold px-4 py-2.5 rounded-full uppercase tracking-widest border transition-all duration-300 shadow-2xl ${
            isDarkImage 
              ? "bg-white/85 text-neutral-900 border-white/20" 
              : "bg-neutral-950/90 text-white border-neutral-800/80"
          }`}>
            {product.category}
          </span>
        </div>
      </div>

      <div className="w-full flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg glass border border-blue-500/20 text-blue-400">
            <Award className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Selección TISA</span>
          </div>
          <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">Verificado</span>
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-6 tracking-tight leading-tight group-hover:text-blue-500 transition-colors">{product.name}</h3>
        
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed font-light">
          {product.description}
        </p>

        {/* Collapsible advantages */}
        {product.advantages && product.advantages.length > 0 && (
          <div className="border-t border-white/5 py-4 w-full">
            <button 
              onClick={() => setShowAdvantages(!showAdvantages)}
              className="flex items-center justify-between w-full text-left text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>Ventajas Clave</span>
              <ChevronDown className={`w-4 h-4 text-blue-500 transition-transform duration-300 ${showAdvantages ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {showAdvantages && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 mt-4 text-xs text-neutral-400 font-light pl-1">
                    {product.advantages.map((advantage, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Collapsible recommendations */}
        {product.whyRecommend && (
          <div className="border-t border-b border-white/5 py-4 mb-8 w-full">
            <button 
              onClick={() => setShowRecommend(!showRecommend)}
              className="flex items-center justify-between w-full text-left text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>Por qué lo recomiendo</span>
              <ChevronDown className={`w-4 h-4 text-emerald-500 transition-transform duration-300 ${showRecommend ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {showRecommend && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-neutral-300 leading-relaxed font-light italic">
                    {product.whyRecommend}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <div className="mt-auto">
          <a 
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white text-black hover:bg-blue-600 hover:text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl uppercase tracking-widest text-[10px] active:scale-[0.98]"
          >
            Consultar Disponibilidad <ExternalLink className="w-4 h-4 opacity-30" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const SolutionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const category = solutionCategories.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!category) {
    return (
      <div className="pt-40 pb-20 bg-neutral-950 min-h-screen text-center bg-grid">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-display font-bold mb-10 tracking-tighter">Categoría no encontrada</h1>
          <Link to="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px]">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://tisaseguridad.shop/soluciones/${category.id}`;
  const seoTitle = `${category.title} | TISA Seguridad`;

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={category.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={category.products[0]?.image ? `https://tisaseguridad.shop${category.products[0].image}` : "https://tisaseguridad.shop/img/logo-full.webp"} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={category.description} />
        <meta name="twitter:image" content={category.products[0]?.image ? `https://tisaseguridad.shop${category.products[0].image}` : "https://tisaseguridad.shop/img/logo-full.webp"} />
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
            ¿Dudas sobre qué sistema elegir? Haz el diagnóstico ahora
          </Link>
        </div>
        
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Catálogo Especializado TISA
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-10 tracking-tighter leading-tight text-white">
            {category.title}
          </h1>
          <p className="text-2xl text-neutral-400 leading-relaxed font-light">
            {category.description}
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-8 pt-10 border-t border-white/5">
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-neutral-500">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
               Listado de productos recomendados
            </div>
            <ShareButtons 
              title={`Mejores soluciones de seguridad para ${category.title} | TISA`}
              url={window.location.href}
              description={category.description}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {category.products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} />
          ))}
        </div>

        {/* Custom personalized Call to Actions bottom banner */}
        <div className="mt-32 p-12 md:p-20 glass-dark rounded-5xl border border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-[120%] aspect-square bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-blue-500 font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">
              <ShieldCheck className="w-4 h-4" /> Despliegue Profesional de Seguridad
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter leading-tight max-w-4xl">
              {category.id === 'vivienda' && (
                <>¿Listo para convertir tu <span className="text-blue-500">vivienda</span> en un búnker inteligente sin pagar cuotas?</>
              )}
              {category.id === 'negocios' && (
                <>Asegura tu <span className="text-blue-500">negocio</span>, protege tus activos y mantén el control total de tu local.</>
              )}
              {category.id === 'vulnerabilidades' && (
                <>Identifica los <span className="text-blue-500">puntos débiles</span> de tu instalación antes de que lo haga un intruso.</>
              )}
              {!['vivienda', 'negocios', 'vulnerabilidades'].includes(category.id) && (
                <>¿Buscas una solución <span className="text-blue-500">Llave en Mano</span> adaptada a tu espacio?</>
              )}
            </h2>
            
            <p className="text-neutral-400 text-lg mb-12 max-w-3xl leading-relaxed font-light">
              {category.id === 'vivienda' && "No dejes la protección de tu familia al azar ni te ates a contratos eternos. Diseñamos sistemas auto-gestionados, inmediatos y sin mensualidades ocultas."}
              {category.id === 'negocios' && "Evita pérdidas de stock, robos fuera de horario e inquilinos no deseados. Configura alertas instantáneas y supervisa el estado de tu negocio desde cualquier lugar."}
              {category.id === 'vulnerabilidades' && "El primer paso para una seguridad real es un análisis riguroso de cada acceso. Evalúa tus riesgos actuales y toma la iniciativa de inmediato."}
              {!['vivienda', 'negocios', 'vulnerabilidades'].includes(category.id) && "Obtén el asesoramiento experto de TISA para implementar un escudo de seguridad robusto, duradero y sin costes permanentes."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
              <Link 
                to="/evaluacion" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-600/20 active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                {category.id === 'vivienda' ? "1. Hacer Diagnóstico de mi Vivienda" : "1. Realizar Diagnóstico Gratuito"}
              </Link>

              <Link 
                to="/blog" 
                className="glass-dark hover:bg-neutral-900 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] active:scale-[0.98]"
              >
                <Info className="w-4 h-4 text-emerald-500" />
                {category.id === 'vivienda' ? "2. Aprender más sobre alarmas en el Blog" : "2. Resolver dudas en el Blog"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetail;
