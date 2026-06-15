const fs = require('fs');
const path = require('path');
const https = require('https');

const imageMap = {
  // Brand/Layout images
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo-full.webp": "img/logo-full.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/4eda08cb13506fc51b80c5b0247d396be2bd8416/img/banner.webp": "img/banner.webp",
  "https://raw.githubusercontent.com/MbFredys/mbfredys.github.io/1cf4ac79438449a681739dc196ab0b0b4e40d845/images/perfil-7.webp": "img/perfil-7.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/cc4253c367c4a8f7f65d97764e71117dbd996067/img/logo.webp": "img/logo.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/625bd7b2a4b216624f909a9f1587aa269893a25c/img/casas.webp": "img/casas.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/625bd7b2a4b216624f909a9f1587aa269893a25c/img/negocios.webp": "img/negocios.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/625bd7b2a4b216624f909a9f1587aa269893a25c/img/okupas.webp": "img/okupas.webp",

  // Blog post images
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/main/img/blog/alarmas-genericas.webp": "img/blog/alarmas-genericas.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/camara-instalada.webp": "img/blog/camara-instalada.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/mejor-camara.webp": "img/blog/mejor-camara.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/configura-cctv.webp": "img/blog/configura-cctv.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/zonas-exclusion.webp": "img/blog/zonas-exclusion.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/838f981dfea78a71e738fb7bc7b221cbf7b63cb6/img/blog/Costos%20real.webp": "img/blog/Costos_real.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/1fc1ae6f0b08962a6b1f56de6108268d2d02a269/img/blog/Costos%20reale%20de%20un%20robo.webp": "img/blog/Costos_reales_de_un_robo.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/verificacion.webp": "img/blog/verificacion.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/errores-criticos.webp": "img/blog/errores-criticos.webp",
  "https://raw.githubusercontent.com/websprintt/Seguridad-TISA/a33c8ef0350d9c5c23c7f869fa1ba71955fe06ae/img/blog/inspeccion.webp": "img/blog/inspeccion.webp",

  // Unsplash images
  "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800": "img/unsplash/problem-robo.jpg",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800": "img/unsplash/problem-okupacion.jpg",
  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800": "img/unsplash/problem-sabotaje.jpg",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800": "img/unsplash/problem-vulnerabilidades.jpg",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100": "img/unsplash/avatar-1.jpg",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100": "img/unsplash/avatar-2.jpg",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100": "img/unsplash/avatar-3.jpg",
  "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800": "img/unsplash/case-vivienda.jpg",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800": "img/unsplash/case-negocios.jpg",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800": "img/unsplash/case-residencias.jpg",

  // Amazon Product photos
  "https://m.media-amazon.com/images/I/71PBEdXg96L._AC_SL1500_.jpg": "img/products/tapo-c335.jpg",
  "https://m.media-amazon.com/images/I/61Sfuf3fyEL._AC_SL1500_.jpg": "img/products/eufy-doorbell.jpg",
  "https://m.media-amazon.com/images/I/71MhoffWqyL._AC_SL1500_.jpg": "img/products/tapo-hub-h100.jpg",
  "https://m.media-amazon.com/images/I/61f+qXLtQcL._AC_SL1500_.jpg": "img/products/eufy-solocam.jpg",
  "https://m.media-amazon.com/images/I/6155xjQxhfL._AC_SL1500_.jpg": "img/products/tapo-l535e.jpg",
  "https://m.media-amazon.com/images/I/61mR-D6SVJL._AC_SL1000_.jpg": "img/products/echo-hub.jpg",
  "https://m.media-amazon.com/images/I/61MceWFXjxL._AC_SL1500_.jpg": "img/products/reolink-nvr.jpg",
  "https://m.media-amazon.com/images/I/61qdLu4Hw2L._AC_SL1000_.jpg": "img/products/tapo-router.jpg",
  "https://m.media-amazon.com/images/I/41QHN9yiRTL._AC_.jpg": "img/products/hikvision-cam.jpg",
  "https://m.media-amazon.com/images/I/51iX6MRu1+L._AC_SL1125_.jpg": "img/products/eufy-cam-3c.jpg",
  "https://m.media-amazon.com/images/I/81gNvA7tOpL._AC_SX679_.jpg": "img/products/wd-purple.jpg",
  "https://m.media-amazon.com/images/I/5137yX3icxL._AC_SL1500_.jpg": "img/products/ajax-starterkit.jpg",
  "https://m.media-amazon.com/images/I/61w5k1SUxOL._AC_SL1500_.jpg": "img/products/reolink-go.jpg",
  "https://m.media-amazon.com/images/I/61EhpGxZ4iL._AC_SL1500_.jpg": "img/products/xsense_detector.jpg",
  "https://m.media-amazon.com/images/I/71KS2hREWwL._AC_SL1500_.jpg": "img/products/nuki-smartlock.jpg",
  "https://m.media-amazon.com/images/I/51ouEZ2OcML._AC_SX679_.jpg": "img/products/tapo-t110.jpg"
};

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, 'public', destPath);
    const dir = path.dirname(fullPath);
    
    // Create folders if they don't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(fullPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded ${url} to ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(fullPath, () => {}); // delete file on error
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting image downloads...');
  const entries = Object.entries(imageMap);
  for (const [url, destPath] of entries) {
    try {
      await downloadFile(url, destPath);
    } catch (err) {
      console.error(`Error downloading ${url}:`, err.message);
    }
  }
  console.log('All downloads task completed.');
}

run();
