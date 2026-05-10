
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Calendar, Clock, Share2, ArrowLeft, ShoppingCart, ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { blogPosts } from '../data/blogPosts';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 bg-neutral-950 min-h-screen text-center">
        <Helmet>
          <title>Artículo no encontrado - Seguridad TISA</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Artículo no encontrado</h1>
          <Link to="/blog" className="text-blue-500 font-bold hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://seguridadeficaz.es/blog/${post.id}`;
  const metaTitle = post.metaTitle || `${post.title} | Seguridad TISA`;
  const metaDesc = post.metaDescription || post.excerpt;

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        {post.keywords && <meta name="keywords" content={post.keywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={post.image} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "image": [post.image],
            "datePublished": post.date,
            "author": [{
                "@type": "Person",
                "name": "Fredys Matos Borges",
                "url": "https://www.linkedin.com/in/mbfredys/"
              }],
            "publisher": {
              "@type": "Organization",
              "name": "Seguridad TISA",
              "logo": {
                "@type": "ImageObject",
                "url": "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp"
              }
            },
            "description": metaDesc
          })}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-blue-500 font-bold mb-12 hover:gap-3 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" /> Regresar
        </button>

        <article>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-bold uppercase tracking-wider text-blue-500 border border-blue-500/30 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400 mb-12 border-y border-white/5 py-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">F</div>
                <div>
                  <a 
                    href="https://www.linkedin.com/in/mbfredys/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-blue-500 transition-colors"
                  >
                    Fredys Matos Borges
                  </a>
                  <div className="text-xs">Especialistas en Seguridad</div>
                </div>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime} de lectura</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16 rounded-[2.5rem] overflow-hidden border border-white/10"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          <div className="max-w-none px-4 md:px-0 markdown-content">
             <div className="text-neutral-300 text-lg leading-relaxed">
               <Markdown 
                 remarkPlugins={[remarkBreaks]}
                 components={{
                 h3: ({ ...props }) => {
                   const isCTA = typeof props.children === 'string' && props.children.toLowerCase().includes('protege tu vivienda');
                   if (isCTA) {
                     return (
                       <h3 className="text-2xl font-display font-bold mb-6 mt-12 text-white bg-blue-600/10 border border-blue-600/30 p-8 rounded-[2rem] text-center shadow-xl shadow-blue-600/5">
                         {props.children}
                       </h3>
                     );
                   }
                   return <h3 {...props} className="text-xl font-display font-bold mb-4 mt-8 text-white" />;
                 },
                 h4: ({ ...props }) => (
                   <h4 {...props} className="text-xl font-display font-bold mb-4 mt-10 text-white underline decoration-blue-500 decoration-2 underline-offset-8" />
                 ),
                 blockquote: ({ ...props }) => (
                   <blockquote className="border-l-4 border-blue-600 pl-6 py-4 italic bg-neutral-900 rounded-r-2xl mb-8 text-neutral-200">
                     {props.children}
                   </blockquote>
                 ),
                 a: ({ ...props }) => {
                   const isExternal = props.href?.startsWith('http');
                   const isAmazon = props.href?.includes('amazon');
                   
                   if (isExternal) {
                     return (
                       <a 
                         {...props} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 px-5 py-2.5 rounded-xl text-sm font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition-all my-4 no-underline shadow-lg group ml-1"
                       >
                         {isAmazon && <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                         {props.children}
                       </a>
                     );
                   }
                   
                   return (
                     <Link 
                       to={props.href || '/'} 
                       className="inline-block text-blue-500 font-bold hover:text-blue-400 transition-colors my-2 underline decoration-blue-500/30 underline-offset-4"
                     >
                       {props.children}
                     </Link>
                   );
                 }
               }}>
                 {post.content}
               </Markdown>
             </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            <Link 
              to="/#soluciones" 
              className="group p-6 bg-neutral-900 hover:bg-neutral-800 border border-white/5 rounded-3xl transition-all"
            >
              <h3 className="text-lg font-display font-bold mb-2 flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                ¿Qué equipo elegir? <ArrowRight className="w-4 h-4" />
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Mira qué sistemas funcionan de verdad según tu escenario real. No compres por miedo.
              </p>
            </Link>

            <Link 
              to="/#alarma-pro" 
              className="group p-6 bg-blue-600 hover:bg-blue-700 rounded-3xl transition-all shadow-xl shadow-blue-600/10"
            >
              <h3 className="text-lg font-display font-bold mb-2 flex items-center gap-2 text-white">
                Estudio Securitas <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                Solicita un presupuesto profesional con conexión directa a la Policía de forma gratuita.
              </p>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
