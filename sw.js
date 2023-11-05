self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-view-cache').then(function(cache) {
      cache.add('https://resignerluth.space');
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith('https://resignerluth.space/')) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request);
        }
      })
    );
  }
});
