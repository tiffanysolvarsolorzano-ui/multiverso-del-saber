// Nombre del contenedor de la caché. Cámbialo (ej: v2) si actualizas tu código para forzar la recarga.
const CACHE_NAME = 'multiverso-cache-v1';

// Lista de todos los archivos y recursos remotos que la app necesita para funcionar offline.
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Librerías externas en la nube (CDN) críticas para el diseño y las fórmulas matemáticas
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js'
];

// Evento 1: INSTALACIÓN
// Se ejecuta la primera vez que visitas la página. Descarga todo y lo guarda en caché.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Guardando archivos estelares en caché...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Evento 2: ACTIVACIÓN
// Se ejecuta cuando el Service Worker toma el control. Borra las cachés viejas si las hay.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Limpiando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Evento 3: INTERCEPTOR DE PETICIONES (FETCH)
// Cada vez que el juego pide un archivo, este bloque decide de dónde sacarlo.
self.addEventListener('fetch', (event) => {
  // Ignoramos peticiones de bases de datos Firebase (solo interceptamos archivos estáticos)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si hay internet, servimos el archivo fresco y guardamos una copia actualizada en caché.
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si NO hay internet (falla el fetch), buscamos el archivo guardado en la caché local.
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
<script>
  // Esta variable es la que falta
  const __firebase_config = '{"apiKey": "...", "authDomain": "...", ...}'; 
</script>