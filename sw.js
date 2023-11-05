self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-youtube-cache').then(function(cache) {
      cache.add('https://www.youtube.com/embed/YOUR_VIDEO_ID');
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith('https://www.youtube.com/embed/')) {
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
