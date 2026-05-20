
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

const BlogList = () => {
  const [activeCategory, setActiveCategory] = React.useState('Guías Prácticas');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'Guías Prácticas',
    'Comparativas',
    'Errores Comunes',
    'Opiniones Técnicas'
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
  );

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>Blog de Seguridad y Alarmas | TISA Seguridad</title>
        <meta name="description" content="Aprende a proteger tu hogar. Guías sobre cámaras de vigilancia, alarmas anti-okupas y consejos de seguridad profesional en toda España." />
      </Helmet>
      
      <div className="container mx-auto px-6">
        <Link to="/" className="group inline-flex items-center gap-3 text-neutral-500 font-bold mb-16 hover:text-white transition-all uppercase tracking-widest text-[10px]">
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Volver a Seguridad TISA
        </Link>
        
        <div className="mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Biblioteca Técnica Digital
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter">Blog de <span className="text-blue-500">Blindaje</span></h1>
          <p className="text-2xl text-neutral-400 leading-relaxed font-light">
            Asesoramiento honesto, guías técnicas y comparativas reales para que tomes la mejor decisión sin pagar de más.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20' 
                  : 'glass border-white/5 text-neutral-500 hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => (
                <motion.div 
                  key={post.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col glass-dark rounded-5xl overflow-hidden hover:border-blue-600/30 transition-all duration-500"
                >
                  <Link to={`/blog/${post.id}`} className="block aspect-[16/10] overflow-hidden relative glass m-4 rounded-4xl">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-6 left-6 flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest glass text-white px-4 py-2 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                  
                  <div className="p-10 flex-grow flex flex-col">
                    <div className="flex items-center gap-6 text-[10px] text-neutral-500 mb-6 font-bold uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-2 px-3 py-1 glass rounded-lg"><Calendar className="w-3 h-3 text-blue-500" /> {post.date}</span>
                      <span className="flex items-center gap-2 px-3 py-1 glass rounded-lg"><Clock className="w-3 h-3 text-blue-500" /> {post.readTime}</span>
                    </div>
                    
                    <h2 className="text-3xl font-display font-bold mb-6 group-hover:text-blue-500 transition-colors leading-tight tracking-tight">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed mb-10 flex-grow font-light">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-[10px] group-hover:gap-5 transition-all w-fit py-4 px-8 glass rounded-2xl group-hover:bg-blue-600"
                    >
                      Continuar Lectura <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-neutral-500 text-lg font-light tracking-wide">No se han encontrado artículos en esta categoría todavía.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
