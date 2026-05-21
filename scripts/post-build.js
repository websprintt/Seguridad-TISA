import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

// Slugs of blog posts matching filenames in src/data/posts/
const SLUG_TO_FILE = {
  'guia-configuracion-cctv-segura': 'configuracion-cctv.ts',
  'alarmas-cuota-mensual-vale-la-pena': 'alarmas-cuota-mensual-vale-la-pena',
  'opiniones-tecnicas-suscripciones-seguridad': 'suscripciones-seguridad.ts',
  'errores-comunes-instalacion-alarmas': 'errores-instalacion.ts',
  'mejor-camara-exterior-wifi-2026': 'mejor-camara-wifi.ts',
  'evitar-okupas-guia-segunda-vivienda': 'evitar-okupas.ts',
};

// Define metadata for each route
const ROUTE_META = {
  'servicios-de-blindaje': {
    title: 'Sistemas de Blindaje y Seguridad | TISA Seguridad',
    description: 'Soluciones diseñadas específicamente para cada escenario real que enfrentas cada día. Análisis de sistemas para viviendas, negocios y segundas residencias.',
  },
  'evaluacion': {
    title: 'Test de Seguridad Escudo TISA | Evalúa tu Vivienda',
    description: 'Realiza nuestro test de seguridad profesional gratuito para auditar puntos vulnerables en tu vivienda o comercio.',
  },
  'contacto': {
    title: 'Contacto | TISA Seguridad',
    description: 'Contacta con Fredys Matos para consultas sobre sistemas de seguridad, auditorías de alarmas y asesoramiento técnico profesional en España.',
  },
  'blog': {
    title: 'Blog de Seguridad y Alarmas | TISA Seguridad',
    description: 'Aprende a proteger tu hogar. Guías sobre cámaras de vigilancia, alarmas anti-okupas y consejos de seguridad profesional en toda España.',
  },
  'blog/guia-configuracion-cctv-segura': {
    title: 'Guía profesional para configurar CCTV en 2026 | TISA Seguridad',
    description: 'Optimización de bitrate, analítica perimetral, seguridad de red y ajuste nocturno de nivel forense para tus cámaras de vigilancia.',
  },
  'blog/verisure-vale-la-pena-analisis': {
    title: '¿Verisure vale la pena en 2026? Análisis técnico | TISA Seguridad',
    description: '¿Realmente Verisure justifica su cuota mensual? Analizamos precios, tecnología PreSense, CRA y alternativas sin cuotas.',
  },
  'blog/opiniones-tecnicas-suscripciones-seguridad': {
    title: 'El negocio de las suscripciones en seguridad | TISA Seguridad',
    description: '¿Merece la pena pagar una suscripción mensual por cada cámara de seguridad? Analizamos almacenamiento local vs nube y privacidad.',
  },
  'blog/errores-comunes-instalacion-alarmas': {
    title: 'Errores críticos al instalar tu sistema de seguridad | TISA Seguridad',
    description: 'Muchos sistemas de seguridad de más de 2.000€ fallan por errores básicos de instalación. Descubre los fallos críticos y evítalos.',
  },
  'blog/mejor-camara-exterior-wifi-2026': {
    title: 'Mejor cámara exterior WiFi: Comparativa real 2026 | TISA Seguridad',
    description: 'Descubre las mejores cámaras del mercado en 2026. Analizamos IA generativa local, sistemas multi-lente y almacenamiento local.',
  },
  'blog/evitar-okupas-guia-segunda-vivienda': {
    title: 'Cómo evitar okupas en una segunda vivienda en 2026 | TISA Seguridad',
    description: 'Guía definitiva para blindar tu segunda vivienda en España. Claves legales (Morada vs Usurpación) y domótica activa preventiva.',
  },
  'soluciones/vivienda': {
    title: 'Sistemas de Seguridad para tu Vivienda | TISA Seguridad',
    description: 'Cámaras WiFi inteligentes con obturador físico antiespía, sensores perimetrales de ventanas y videoporteros sin cuotas.',
  },
  'soluciones/negocios': {
    title: 'CCTV y Seguridad Profesional para Negocios | TISA Seguridad',
    description: 'Sistemas CCTV de alta definición 4K PoE estables, almacenamiento de alta de capacidad de vídeo y seguridad de red local.',
  },
  'soluciones/residencias': {
    title: 'Alarmas y Protección para Segundas Residencias | TISA Seguridad',
    description: 'Sistemas anti-ocupas autónomos homologados, alimentados por panel solar y conectividad 4G para proteger tu residencia vacacional.',
  },
  'aviso-legal': {
    title: 'Aviso Legal | TISA Seguridad',
    description: 'Aviso legal, términos de uso y condiciones de navegación para el portal de Seguridad TISA.',
  },
  'politica-de-privacidad': {
    title: 'Política de Privacidad | TISA Seguridad',
    description: 'Información detallada sobre el tratamiento de tus datos personales, cumplimiento del de RGPD y privacidad en TISA.',
  },
  'politica-de-cookies': {
    title: 'Política de Cookies | TISA Seguridad',
    description: 'Uso de cookies propias y de terceros para analítica web y personalización de enlaces de afiliados en TISA.',
  }
};

/**
 * Super simple, clean Markdown-to-HTML parser for SEO static renderings
 */
function markdownToHtml(md) {
  if (!md) return '';

  // Escaping angle brackets minimally
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = html.split('\n');
  const result = [];
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2 class="text-2xl font-bold text-white mt-10 mb-4">${trimmed.substring(3).trim()}</h2>`);
    } else if (trimmed.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3 class="text-xl font-semibold text-neutral-100 mt-8 mb-3">${trimmed.substring(4).trim()}</h3>`);
    } else if (trimmed.startsWith('#### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h4 class="text-lg font-semibold text-neutral-200 mt-6 mb-2">${trimmed.substring(5).trim()}</h4>`);
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inList) {
        result.push('<ul class="list-disc pl-6 space-y-2 mb-4 text-neutral-300">');
        inList = true;
      }
      result.push(`<li>${trimmed.substring(2).trim()}</li>`);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(`<p class="mb-4 text-neutral-300 leading-relaxed">${trimmed}</p>`);
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  let finalHtml = result.join('\n');

  // Markdown inline formats
  finalHtml = finalHtml.replace(/\*\*([\s\S]*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  finalHtml = finalHtml.replace(/\*([\s\S]*?)\*/g, '<em class="text-neutral-200">$1</em>');
  finalHtml = finalHtml.replace(/_([\s\S]*?)_/g, '<em class="text-neutral-200">$1</em>');
  finalHtml = finalHtml.replace(/`([\s\S]*?)`/g, '<code class="bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded font-mono text-sm text-yellow-500">$1</code>');
  finalHtml = finalHtml.replace(/\[([\s\S]*?)\]\(([\s\S]*?)\)/g, '<a class="text-blue-400 hover:text-blue-300 underline" href="$2">$1</a>');

  return finalHtml;
}

/**
 * Extracts fields from the TS files in src/data/posts/
 */
function parseBlogPostFile(slug) {
  const fileName = SLUG_TO_FILE[slug];
  if (!fileName) return null;

  const filePath = path.join(__dirname, '../src/data/posts', fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: Post file not found: ${filePath}`);
    return null;
  }

  const code = fs.readFileSync(filePath, 'utf-8');

  const titleMatch = code.match(/title:\s*["']([\s\S]*?)["'],/);
  const title = titleMatch ? titleMatch[1] : '';

  const excerptMatch = code.match(/excerpt:\s*["']([\s\S]*?)["'],/);
  const excerpt = excerptMatch ? excerptMatch[1] : '';

  const dateMatch = code.match(/date:\s*["']([\s\S]*?)["'],/);
  const date = dateMatch ? dateMatch[1] : '';

  const readTimeMatch = code.match(/readTime:\s*["']([\s\S]*?)["'],/);
  const readTime = readTimeMatch ? readTimeMatch[1] : '';

  const contentMatch = code.match(/content:\s*`([\s\S]*?)`/);
  const content = contentMatch ? contentMatch[1] : '';

  return { slug, title, excerpt, date, readTime, content };
}

/**
 * Extracts solutions products from src/data/solutions.ts
 */
function parseSolutionsProducts(categoryKey) {
  const filePath = path.join(__dirname, '../src/data/solutions.ts');
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: solutions.ts file not found at ${filePath}`);
    return [];
  }

  const tsContent = fs.readFileSync(filePath, 'utf-8');
  const catIndex = tsContent.indexOf(`id: "${categoryKey}"`);
  if (catIndex === -1) return [];

  let segment = tsContent.substring(catIndex);
  const nextCatIndex = segment.indexOf('id: "', 20);
  if (nextCatIndex !== -1) {
    segment = segment.substring(0, nextCatIndex);
  }

  const products = [];
  // Split products by their open bracket
  const productBlocks = segment.split('{\n        id: "');

  for (let i = 1; i < productBlocks.length; i++) {
    const block = productBlocks[i];
    
    const nameMatch = block.match(/name:\s*"(.*?)"/);
    const name = nameMatch ? nameMatch[1] : '';

    const descMatch = block.match(/description:\s*"(.*?)"/);
    const description = descMatch ? descMatch[1] : '';

    const whyMatch = block.match(/whyRecommend:\s*"(.*?)"/);
    const whyRecommend = whyMatch ? whyMatch[1] : '';

    if (name && description) {
      products.push({ name, description, whyRecommend });
    }
  }

  return products;
}

function run() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: index.html not found in dist/ at path: ${INDEX_HTML_PATH}`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // Copy a generic fallback for standard SPA fallback 404
  console.log('Generating general 404 fallback from index.html...');
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), baseHtml, 'utf-8');

  // Parse all posts beforehand so we can list them on the '/blog' route
  const allPosts = [];
  for (const slug of Object.keys(SLUG_TO_FILE)) {
    const parsed = parseBlogPostFile(slug);
    if (parsed) allPosts.push(parsed);
  }

  for (const [route, meta] of Object.entries(ROUTE_META)) {
    const routeDir = path.join(DIST_DIR, route);

    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const canonicalUrl = `https://tisaseguridad.shop/${route}`;

    // Perform specific replacements
    let pageHtml = baseHtml;

    // 1. Title replacement
    pageHtml = pageHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${meta.title}</title>`
    );

    // 2. Direct Description replacement
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="description" content="${meta.description}" />`
    );

    // 3. Canonical replacement
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 4. Open Graph replacements
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${meta.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${meta.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // 5. Twitter replacements
    pageHtml = pageHtml.replace(
      /<meta\s+property="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="twitter:title" content="${meta.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="twitter:description" content="${meta.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="twitter:url"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="twitter:url" content="${canonicalUrl}" />`
    );

    // --- SECOND STAGE: PRE-RENDER SECTIONS INSIDE <div id="root"> ---
    let preRenderedContent = '';

    if (route.startsWith('blog/')) {
      const slug = route.substring(5);
      const post = allPosts.find(p => p.slug === slug);

      if (post) {
        const bodyHtml = markdownToHtml(post.content);
        preRenderedContent = `
          <div class="pt-40 pb-32 bg-neutral-950 min-h-screen">
            <div class="container mx-auto px-6 max-w-4xl">
              <article class="prose prose-invert lg:prose-xl mx-auto">
                <header class="mb-10 border-b border-neutral-800 pb-8">
                  <h1 class="text-4xl md:text-5xl font-sans font-bold text-white mb-6 leading-tight">${post.title}</h1>
                  <div class="flex items-center gap-4 text-sm text-neutral-400 font-mono">
                    <span class="bg-neutral-900 px-3 py-1 rounded-full text-[11px] border border-neutral-800 text-blue-400 font-semibold uppercase tracking-wider">Artículo Técnico</span>
                    <span>•</span>
                    <span>${post.date}</span>
                    <span>•</span>
                    <span>${post.readTime} de lectura</span>
                  </div>
                </header>
                <div class="text-neutral-300 leading-relaxed text-lg font-normal">
                  ${bodyHtml}
                </div>
              </article>
            </div>
          </div>
        `;
      }
    } else if (route === 'blog') {
      // List all posts dynamically so Google can crawl and parse all internal links
      const postsListHtml = allPosts.map(post => `
        <div class="p-8 rounded-xl border border-neutral-900 bg-neutral-950 hover:border-blue-500/30 transition-all duration-300">
          <span class="text-xs text-blue-400 font-mono font-bold uppercase tracking-widest block mb-2">${post.date} • ${post.readTime}</span>
          <h2 class="text-2xl font-sans font-bold text-white mb-3 hover:text-blue-400">
            <a href="https://tisaseguridad.shop/blog/${post.slug}">${post.title}</a>
          </h2>
          <p class="text-neutral-400 text-base leading-relaxed mb-4">${post.excerpt}</p>
          <a class="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center gap-1 hover:underline" href="https://tisaseguridad.shop/blog/${post.slug}">
            Leer artículo completo →
          </a>
        </div>
      `).join('\n');

      preRenderedContent = `
        <div class="pt-40 pb-32 bg-neutral-950 min-h-screen">
          <div class="container mx-auto px-6 max-w-4xl">
            <div class="border-b border-neutral-900 pb-8 mb-12">
              <h1 class="text-4xl md:text-5xl font-sans font-bold text-white mb-4">Blog de Seguridad y Alarmas</h1>
              <p class="text-neutral-400 text-lg">Aprende a proteger tu hogar sin cuotas innecesarias. Guías, comparativas y consejos técnicos de seguridad profesional en España.</p>
            </div>
            <div class="space-y-8">
              ${postsListHtml}
            </div>
          </div>
        </div>
      `;
    } else if (route.startsWith('soluciones/')) {
      const catKey = route.substring(11); // Solutions list: "vivienda", "negocios", or "residencias"
      const products = parseSolutionsProducts(catKey);

      const productsHtml = products.map(prod => `
        <div class="p-8 rounded-xl border border-neutral-900 bg-neutral-950 mt-8">
          <h2 class="text-2xl font-bold text-white mb-2">${prod.name}</h2>
          <p class="text-neutral-300 leading-relaxed mb-4 text-base">${prod.description}</p>
          <div class="p-4 rounded bg-neutral-900/50 border border-neutral-800/80 mt-4">
            <strong class="text-sm text-blue-400 font-mono uppercase tracking-wider block mb-1">¿Por qué lo recomendamos?</strong>
            <p class="text-neutral-400 text-sm leading-relaxed">${prod.whyRecommend}</p>
          </div>
        </div>
      `).join('\n');

      preRenderedContent = `
        <div class="pt-40 pb-32 bg-neutral-950 min-h-screen">
          <div class="container mx-auto px-6 max-w-3xl">
            <div class="border-b border-neutral-800 pb-6 mb-10">
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">${meta.title}</h1>
              <p class="text-neutral-400 text-base">${meta.description}</p>
            </div>
            <div class="space-y-6">
              ${productsHtml}
            </div>
          </div>
        </div>
      `;
    } else {
      // Basic aesthetic structured page placeholder inside root for other legal/generic pages
      preRenderedContent = `
        <div class="pt-40 pb-32 bg-neutral-950 min-h-screen">
          <div class="container mx-auto px-6 max-w-3xl">
            <h1 class="text-3xl font-bold text-white mb-6">${meta.title}</h1>
            <p class="text-neutral-400 leading-relaxed text-lg">${meta.description}</p>
            <div class="mt-8 p-6 bg-neutral-900 rounded-lg border border-neutral-800 text-neutral-400">
              <p class="mb-2">Estás accediendo a la versión pre-renderizada estática del portal de seguridad TISA.</p>
              <p>Para interactuar plenamente con nuestras herramientas avanzadas de diagnóstico de seguridad y presupuestos sin coste, asegúrate de tener JavaScript habilitado.</p>
            </div>
          </div>
        </div>
      `;
    }

    // Embed the static render right inside <div id="root">
    pageHtml = pageHtml.replace(
      /<div\s+id="root">\s*<\/div>/i,
      `<div id="root">${preRenderedContent}</div>`
    );

    const routeIndexHtmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeIndexHtmlPath, pageHtml, 'utf-8');
    console.log(`Pre-rendered content embedded for '/${route}': (200 OK) -> Title: "${meta.title}"`);
  }

  console.log('Post-build script finished successfully. All site routes fully pre-rendered with customized seo metadata headers and full-body semantic HTML content.');
}

run();
