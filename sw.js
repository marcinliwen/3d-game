/**
 * 
 * install service worker
 */

var cacheName = 'pwa-test-v6';
var filesToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/style.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

/**
 * 
 * 
 * activate sw
 */

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  /**
   * 
   * 
   * fetch sw
   *
   * */

    //network first then catch
    self.addEventListener('fetch', function(event) {
        event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
        );
    });

/*
    //cache -> network
    self.addEventListener('fetch', function(event) {
        
        event.respondWith(
          caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
          })
        );
      });
    */
   /*
    //network only
    self.addEventListener('fetch', function(e) {
        console.log('[ServiceWorker] Fetch', e.request.url);
        e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
        );
    });
   

    /*
    //if you are offline fetch offline.html
   self.addEventListener('install', function(event) {
    var offlineRequest = new Request('offline.html');
    event.waitUntil(
      fetch(offlineRequest).then(function(response) {
        return caches.open('offline').then(function(cache) {
          console.log('[oninstall] Cached offline page', response.url);
          return cache.put(offlineRequest, response);
        });
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    var request = event.request;
    if (request.method === 'GET') {
        event.respondWith(
            fetch(request).catch(function(error) {
                console.error(
                    '[onfetch] Failed. Serving cached offline fallback ' +
                    error
                  );
                  return caches.open('offline').then(function(cache) {
                    return cache.match('offline.html');
                  });
                })
              );
            }
        });
    */