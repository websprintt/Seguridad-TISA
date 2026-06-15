/**
 * Resolves static asset paths correctly by prepending the Vite base path.
 * This ensures that when deployed on a subpath (like GitHub Pages '/Seguridad-TISA/'),
 * the paths to the public directory assets (e.g. /img/...) resolve correctly.
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  // If it's already an absolute external URL, return it
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Guarantee absolute path starting with /
  return path.startsWith('/') ? path : `/${path}`;
}
