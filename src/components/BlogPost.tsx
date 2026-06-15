
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Calendar, Clock, Share2, ArrowLeft, ShoppingCart, ArrowRight, ExternalLink, Smartphone, ShieldCheck, Linkedin, MessageCircle, Zap, ChevronDown, Lock, Cloud } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blogPosts';
import ShareButtons from './ShareButtons';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-display font-bold text-white group-hover:text-blue-500 transition-colors tracking-tight">{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${isOpen ? 'rotate-180 bg-blue-600 border-blue-600' : ''}`}>
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pb-8 text-neutral-400 leading-relaxed font-light text-base pr-8">
          <Markdown 
            remarkPlugins={[remarkBreaks]}
            components={{
              p: ({ node, ...props }) => <div {...props} className="mb-4 last:mb-0" />,
              a: ({ node, ...props }) => {
                const isExternal = props.href?.startsWith('http');
                if (isExternal) {
                  return (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:text-blue-400 font-bold underline transition-colors"
                    >
                      {props.children}
                    </a>
                  );
                }
                return (
                  <Link 
                    to={props.href || '/'} 
                    className="text-blue-500 hover:text-blue-400 font-bold underline transition-colors"
                  >
                    {props.children}
                  </Link>
                );
              }
            }}
          >
            {answer}
          </Markdown>
        </div>
      </motion.div>
    </div>
  );
};

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-40 pb-20 bg-neutral-950 min-h-screen text-center bg-grid">
        <Helmet>
          <title>Artículo no encontrado - Seguridad TISA</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter">Artículo no encontrado</h1>
          <Link to="/blog" className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://tisaseguridad.shop/blog/${post.id}`;
  const metaTitle = post.metaTitle || `${post.title} | Seguridad TISA`;
  const metaDesc = post.metaDescription || post.excerpt;

  // FAQ Parsing
  const faqDividerRegex = /## (?:❓ )?FAQ:/;
  const dividerMatch = post.content.match(faqDividerRegex);
  const faqDivider = dividerMatch ? dividerMatch[0] : '## FAQ:';
  const parts = post.content.split(faqDivider);
  const mainContentBody = parts[0];
  const faqRaw = parts[1] || '';

  const faqItems: { q: string, a: string }[] = [];
  if (faqRaw) {
    // Matches **Question?** followed by any text until next ** or end
    const faqRegex = /\*\*(.*?)\*\*\n(.*?)(?=\n\*\*|$)/gs;
    let match;
    while ((match = faqRegex.exec(faqRaw)) !== null) {
      faqItems.push({ q: match[1], a: match[2].trim() });
    }
  }

  return (
    <div className="pt-40 pb-32 bg-neutral-950 min-h-screen bg-grid">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        {post.keywords && <meta name="keywords" content={post.keywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={`https://tisaseguridad.shop${post.image}`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={`https://tisaseguridad.shop${post.image}`} />

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
                "jobTitle": "Hardware Engineer",
                "url": "https://www.linkedin.com/in/mbfredys/"
              }],
            "publisher": {
              "@type": "Organization",
              "name": "Seguridad TISA",
              "logo": {
                "@type": "ImageObject",
                "url": "/img/logo-full.webp"
              }
            },
            "description": metaDesc
          })}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-4xl">
        <Link 
          to="/blog" 
          className="group inline-flex items-center gap-3 text-neutral-500 font-bold mb-16 hover:text-white transition-all uppercase tracking-widest text-[10px] cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Regresar a la biblioteca
        </Link>

        <article>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex gap-2 mb-10">
              {post.tags.map(tag => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-blue-400 glass border border-blue-500/10 px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-12 leading-[1.1] tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-10 text-[10px] text-neutral-500 mb-16 border-y border-white/5 py-10 font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass overflow-hidden border border-blue-500/20 group-hover:border-blue-500 transition-colors">
                  <img 
                    src="/img/perfil-7.webp" 
                    alt="Fredys Matos Borges"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 lowercase">
                    <span className="text-neutral-600">by</span>
                    <a 
                      href="https://www.linkedin.com/in/mbfredys/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-500 transition-colors capitalize"
                    >
                      Fredys Matos Borges
                    </a>
                  </div>
                  <div className="text-neutral-600 mt-1 normal-case font-medium">
                    Hardware Engineer • Ex Security Systems Project Engineer
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-xl"><Calendar className="w-3 h-3 text-blue-500" /> {post.date}</div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 glass rounded-xl"><Clock className="w-3 h-3 text-blue-500" /> {post.readTime} Lectura</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20 rounded-5xl overflow-hidden glass p-4"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full aspect-[21/9] object-cover rounded-4xl grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>

          <div className="max-w-none px-4 md:px-0 markdown-content">
             <div className="text-neutral-400 text-lg leading-relaxed font-light">
                <Markdown 
                  remarkPlugins={[remarkBreaks, remarkGfm]}
                  components={{
                  table: ({ node, ...props }) => (
                    <div className="my-16 overflow-x-auto rounded-xl border border-white/5 bg-[#111827] shadow-3xl">
                      <table {...props} className="w-full text-left border-collapse min-w-[700px]" />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead {...props} className="bg-[#1f2937] border-b border-white/10" />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="px-6 py-5 text-[12px] uppercase tracking-wider font-bold text-[#93c5fd] font-display" />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr {...props} className="border-b border-white/5 last:border-0 hover:bg-[#1e293b] transition-colors group/row" />
                  ),
                  td: ({ node, ...props }) => {
                    const children = props.children;
                    const getText = (node: any): string => {
                      if (!node) return '';
                      if (typeof node === 'string') return node;
                      if (Array.isArray(node)) return node.map(getText).join('');
                      if (node.props && node.props.children) return getText(node.props.children);
                      return '';
                    };
                    
                    const content = getText(children).trim();
                    const isResolution = /^\s*(?:[248]K(?:\+)?(?:\s+HDR)?|\d+\s*MP)\s*$/i.test(content);
                    const isStorage = /^(?:local|nube|cloud|almacenamiento|sd|nvr|nas)/i.test(content) && content.length < 35;
                    const isBadge = (content.includes('Triple') || content.includes('IA') || content.includes('WiFi') || content.includes('Radar') || content.includes('Hub') || content.includes('Matter')) && content.length < 35;
                    
                    return (
                      <td {...props} className="px-6 py-4 text-sm align-middle border-b border-[#1f2937]">
                        {isResolution ? (
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <span className="font-mono font-bold text-white tracking-wider text-sm">{content}</span>
                          </div>
                        ) : isStorage ? (
                          <div className="flex items-center gap-2 text-neutral-300">
                            {/cloud|nube/i.test(content) ? (
                              <Cloud className="w-3.5 h-3.5 text-blue-400" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-[#93c5fd]/60" />
                            )}
                            <span className="font-medium text-sm text-neutral-200">{content}</span>
                          </div>
                        ) : isBadge ? (
                          <div className="flex flex-wrap gap-1">
                            {content.split('+').map((badge, i) => (
                              <span key={i} className="bg-blue-600/10 text-[#93c5fd] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-500/10 whitespace-nowrap">
                                {badge.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-300 font-medium">{children}</span>
                        )}
                      </td>
                    );
                  },
                  h2: ({ node, ...props }) => {
                    return (
                      <h2 {...props} className="text-3xl md:text-4xl font-display font-bold mb-6 mt-14 text-white tracking-tight scroll-mt-32" id={typeof props.children === 'string' ? props.children.toLowerCase().replace(/\s+/g, '-') : undefined}>{props.children}</h2>
                    );
                  },
                  h3: ({ node, ...props }) => {
                    const children = props.children;
                    const isCTA = typeof children === 'string' && (
                      children.toLowerCase().includes('protege tu') || 
                      children.toLowerCase().includes('estudio gratuito') ||
                      children.toLowerCase().includes('diagnóstico') ||
                      children.toLowerCase().includes('evalúa') ||
                      children.toLowerCase().includes('compruébalo') ||
                      children.toLowerCase().includes('descúbrelo') ||
                      children.toLowerCase().includes('analízalo') ||
                      children.toLowerCase().includes('valora') ||
                      children.toLowerCase().includes('calcula') ||
                      children.toLowerCase().includes('vulnerabilidad')
                    );
                    
                    if (isCTA) {
                      return (
                        <div className="my-12 p-8 md:p-10 bg-neutral-900/50 border-y border-white/5 relative overflow-hidden group">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex-1 text-center md:text-left">
                              <h4 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Diagnóstico de Blindaje</h4>
                              <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight m-0">{children}</h3>
                            </div>
                            <div className="flex shrink-0">
                              <Link 
                                to="/evaluacion" 
                                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-[10px] uppercase tracking-widest no-underline flex items-center gap-3"
                              >
                                <Zap className="w-4 h-4 fill-current" />
                                Hacer Diagnóstico
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return <h3 {...props} className="text-2xl font-display font-bold mb-5 mt-10 text-white tracking-tight" />;
                  },
                  h4: ({ node, ...props }) => (
                    <h4 {...props} className="text-lg font-display font-bold mb-4 mt-10 text-white border-l-4 border-blue-600 pl-6 py-1 tracking-wide uppercase text-[11px]" />
                  ),
                  p: ({ node, children, ...props }) => {
                    const hasImage = node?.children?.some(
                      (child: any) => child.type === 'element' && child.tagName === 'img'
                    );
                    if (hasImage) {
                      return (
                        <div className="mb-6 last:mb-0 leading-relaxed text-neutral-400">
                          {children}
                        </div>
                      );
                    }
                    return (
                      <p {...props} className="mb-6 last:mb-0 leading-relaxed text-neutral-400">
                        {children}
                      </p>
                    );
                  },
                  img: ({ node, ...props }) => (
                    <div className="my-16 rounded-3xl overflow-hidden glass p-3 group">
                      <img {...props} className="w-full rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                      {props.alt && <div className="text-center text-[10px] uppercase tracking-widest text-neutral-500 mt-4 font-bold">{props.alt}</div>}
                    </div>
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="space-y-4 mb-10 list-none" />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="flex items-start gap-4 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                      <div>{props.children}</div>
                    </li>
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-600 pl-8 py-8 italic glass-dark rounded-r-4xl mb-12 text-neutral-200 text-xl font-light leading-relaxed">
                      {props.children}
                    </blockquote>
                  ),
                  a: ({ node, ...props }) => {
                    const isExternal = props.href?.startsWith('http');
                    const isAmazon = props.href?.includes('amazon');
                    
                    if (isExternal) {
                      return (
                        <a 
                          {...props} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 font-bold hover:text-blue-400 transition-colors underline decoration-blue-500/30 underline-offset-4 inline-flex items-center gap-1.5 group/link"
                        >
                          {props.children}
                          {isAmazon ? (
                            <ShoppingCart className="w-3.5 h-3.5 transition-transform group-hover/link:scale-110" />
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5 opacity-50 transition-opacity group-hover/link:opacity-100" />
                          )}
                        </a>
                      );
                    }
                    
                    return (
                      <Link 
                        to={props.href || '/'} 
                        className="text-blue-500 font-bold hover:text-blue-400 transition-colors underline decoration-blue-500/30 underline-offset-4 inline-flex items-center gap-1"
                      >
                        {props.children}
                      </Link>
                    );
                  }
                }}>
                  {mainContentBody}
                </Markdown>
             </div>

             {faqItems.length > 0 && (
               <div className="mt-24 border-t border-white/5 pt-20">
                 <div className="flex items-center gap-4 mb-12">
                   <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                     <MessageCircle className="w-6 h-6" />
                   </div>
                   <div>
                     <h2 className="text-3xl font-display font-bold text-white tracking-tight m-0">Preguntas Frecuentes</h2>
                     <p className="text-neutral-500 text-sm mt-1">Resolvemos tus dudas técnicas de forma directa</p>
                   </div>
                 </div>
                 <div className="glass-dark border border-white/5 rounded-4xl p-2 md:p-4">
                   {faqItems.map((item, idx) => (
                     <FAQItem key={idx} question={item.q} answer={item.a} />
                   ))}
                 </div>
               </div>
             )}
          </div>

          <div className="mt-20 p-8 md:p-12 glass-dark border border-white/5 rounded-5xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-blue-600/10 transition-colors" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl glass border border-blue-500/20 flex items-center justify-center text-3xl font-display font-bold text-blue-500 shadow-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src="/img/perfil-7.webp" 
                    alt="Fredys Matos Borges"
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) parent.textContent = 'F';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-green-500 border-4 border-neutral-950 flex items-center justify-center shadow-lg" title="Disponible para asesoría">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Fredys Matos Borges</h3>
                  <a 
                    href="https://www.linkedin.com/in/mbfredys/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all w-fit mx-auto md:mx-0"
                  >
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                  </a>
                </div>
                
                <div className="mb-6 flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 glass border border-white/5 px-4 py-2 rounded-full">Hardware Engineer</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 glass border border-white/5 px-4 py-2 rounded-full">Ex Security Systems Project Engineer</span>
                </div>

                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light max-w-xl">
                  Especialista en hardware y diseño de sistemas de seguridad con más de 6 años de experiencia real en campo. Después de años diseñando, instalando y diagnosticando fallos en infraestructuras críticas, mi objetivo es ayudarte a elegir equipos confiables basados en ingeniería, no en promesas comerciales.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 py-10 border-t border-white/5">
            <ShareButtons 
              title={post.title} 
              url={canonicalUrl} 
              description={post.excerpt} 
            />
          </div>

          <div className="mt-32 grid sm:grid-cols-2 gap-8">
            <Link 
              to="/#soluciones" 
              className="group p-10 glass-dark hover:border-blue-600/20 rounded-5xl transition-all duration-500 border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3 group-hover:text-blue-500 transition-colors tracking-tight">
                Asistente Técnico <ArrowRight className="w-5 h-5" />
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-light">
                Mira qué sistemas funcionan de verdad según tu escenario real. No compres por miedo.
              </p>
            </Link>

            <Link 
              to="/#experiencia" 
              className="group p-10 bg-blue-600 hover:bg-blue-500 rounded-5xl transition-all duration-500 shadow-2xl shadow-blue-600/20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-8">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3 text-white tracking-tight">
                Mi Trayectoria <ArrowRight className="w-5 h-5 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-blue-100/70 text-sm leading-relaxed font-light">
                Conoce mi experiencia real diseñando e instalando sistemas complejos de seguridad.
              </p>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;
