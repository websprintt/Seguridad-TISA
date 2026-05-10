
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, ChevronLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';

const BlogList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <Helmet>
        <title>Blog de Seguridad y Alarmas | Escuela TISA</title>
        <meta name="description" content="Aprende a proteger tu hogar. Guías sobre cámaras de vigilancia, alarmas anti-okupas y consejos de seguridad profesional en toda España." />
        <link rel="canonical" href="https://seguridadeficaz.es/blog" />
      </Helmet>
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 font-bold mb-12 hover:gap-3 transition-all">
          <ChevronLeft className="w-5 h-5" /> Volver al Inicio
        </Link>
        
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Escuela de Seguridad</h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Asesoramiento honesto, guías técnicas y comparativas reales para que tomes la mejor decisión sin pagar de más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <motion.div 
              key={post.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-600/30 transition-all shadow-xl shadow-black/50"
            >
              <Link to={`/blog/${post.id}`} className="block h-60 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4 font-medium uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-blue-500 transition-colors leading-tight">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-2 text-blue-500 font-bold group-hover:gap-3 transition-all"
                >
                  Leer artículo completo <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
