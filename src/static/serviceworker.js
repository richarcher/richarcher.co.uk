'use strict';

const version = 'v1.0.13::';
const staticCacheName = version + 'static';
const pagesCacheName = version + 'articles';
const imagesCacheName = version + 'images';
const offlinePages = [
    '/',
    '/articles/'
];


function updateStaticCache() {
    return caches.open(staticCacheName)
        .then( cache => {
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll([
                '/js/global.js',
                '/style.css',
                '/img/image_258.jpg',
                '/img/launcher-icon-0-75x.png',
                '/img/launcher-icon-1x.png',
                '/img/launcher-icon-1-5x.png',
                '/img/launcher-icon-2x.png',
                '/img/launcher-icon-3x.png',
                '/img/launcher-icon-4x.png'
            ]);
        });
}

function stashInCache(cacheName, request, response) {
    caches.open(cacheName)
        .then( cache => cache.put(request, response) );
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
        .then( keys => {
            return Promise.all(keys
                .filter(key => key.indexOf(version) !== 0)
                .map(key => caches.delete(key))
            );
        });
}

self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache()
    .then( () => self.skipWaiting() )
  );
});
self.addEventListener('activate', event => {
    event.waitUntil(clearOldCaches()
        .then( () => self.clients.claim() )
    );
});
self.addEventListener('message', event => {});
self.addEventListener('fetch', event => {
    let request = event.request;
    let url = new URL(request.url);

    // Only deal with requests to my own server
    if (url.origin !== location.origin) {
        return;
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
        request = new Request(url, {
            method: 'GET',
            headers: request.headers,
            mode: request.mode == 'navigate' ? 'cors' : request.mode,
            credentials: request.credentials,
            redirect: request.redirect
        });
        event.respondWith(
            fetch(request)
                .then( response => {
                    // NETWORK
                    // Stash a copy of this page in the pages cache
                    let copy = response.clone();
                    if (offlinePages.includes(url.pathname) || offlinePages.includes(url.pathname + '/')) {
                        stashInCache(staticCacheName, request, copy);
                    } else {
                        stashInCache(pagesCacheName, request, copy);
                    }
                    return response;
                })
                .catch( () => {
                    // CACHE or FALLBACK
                    return caches.match(request)
                        .then( response => response || caches.match('/offline') );
                })
        );
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
            .then(response => {
                // CACHE
                return response || fetch(request)
                    .then( response => {
                        // NETWORK
                        // If the request is for an image, stash a copy of this image in the images cache
                        if (request.headers.get('Accept').indexOf('image') !== -1) {
                            let copy = response.clone();
                            stashInCache(imagesCacheName, request, copy);
                        }
                        return response;
                    })
                    .catch( () => {
                        // OFFLINE
                        // If the request is for an image, show an offline placeholder
                        if (request.headers.get('Accept').indexOf('image') !== -1) {
                            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml'}});
                        }
                    });
            })
    );
});
