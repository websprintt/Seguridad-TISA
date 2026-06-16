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
  
  // Guard against accidental leading 'public/' or '/public/' prefixes
  let cleanPath = path;
  if (cleanPath.startsWith('/public/')) {
    cleanPath = cleanPath.slice(8);
  } else if (cleanPath.startsWith('public/')) {
    cleanPath = cleanPath.slice(7);
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  
  // Dynamically determine the base path depending on whether the site
  // is loaded from a subpath (e.g. /Seguridad-TISA/ on GitHub Pages)
  // or a custom domain root (e.g. /). This guarantees absolute paths
  // that do not break inside deep routes like /blog/some-article.
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.pathname.includes('/Seguridad-TISA')) {
      return `/Seguridad-TISA/${cleanPath}`;
    }
  }
  
  return `/${cleanPath}`;
}
