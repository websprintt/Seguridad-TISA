
import { BlogPost } from '../types';
import { post as evitarOkupas } from './posts/evitar-okupas';
import { post as mejorCamara } from './posts/mejor-camara-wifi';
import { post as erroresInstalacion } from './posts/errores-instalacion';
import { post as suscripciones } from './posts/suscripciones-seguridad';
import { post as verisure } from './posts/analisis-verisure';
import { post as configuracionCctv } from './posts/configuracion-cctv';

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  evitarOkupas,
  mejorCamara,
  erroresInstalacion,
  suscripciones,
  verisure,
  configuracionCctv
];
