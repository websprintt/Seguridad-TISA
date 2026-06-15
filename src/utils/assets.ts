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
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Dynamically determine the base path based on the browser's URL location.
  // Since we use BrowserRouter, we determine whether the active path
  // includes the GitHub Pages project subkey '/Seguridad-TISA/'.
  let base = '/';
  if (typeof window !== 'undefined' && window.location) {
    const pathname = window.location.pathname;
    if (pathname.includes('/Seguridad-TISA')) {
      base = '/Seguridad-TISA/';
    }
  }
  
  return `${base}${cleanPath}`;
}
