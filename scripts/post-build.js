import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

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

function run() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error(`Error: index.html not found in dist/ at path: ${INDEX_HTML_PATH}`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // Let's copy a generic fallback for other potential 404 paths
  console.log('Generating general 404 fallback from index.html...');
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), baseHtml, 'utf-8');

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

    const routeIndexHtmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeIndexHtmlPath, pageHtml, 'utf-8');
    console.log(`Generated pre-rendered dynamic SEO route page for '/${route}': (200 OK) -> Title: "${meta.title}"`);
  }

  console.log('Post-build script finished successfully. All site routes fully pre-rendered with customized seo metadata headers.');
}

run();
