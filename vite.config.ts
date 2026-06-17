import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';

// Plugin personalizado para forzar la copia física de la carpeta img a dist/img
const forceCopyImgPlugin = () => {
  return {
    name: 'force-copy-img',
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'public/img');
      const destDir = path.resolve(__dirname, 'dist/img');

      if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        const files = fs.readdirSync(srcDir);
        for (const file of files) {
          const srcFile = path.join(srcDir, file);
          const destFile = path.join(destDir, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
        console.log('--- [VITE] Carpeta public/img copiada forzosamente a dist/img con éxito ---');
      } else {
        console.warn('--- [VITE] ALERTA: No se encontró la carpeta original public/img ---');
      }
    }
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    // Absolute base path ensures build targets resolve perfectly from custom domain root
    base: '/',
    plugins: [react(), tailwindcss(), forceCopyImgPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('markdown') || id.includes('remark')) {
                return 'vendor-markdown';
              }
              return 'vendor-others';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
