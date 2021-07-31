const FILES_TO_CACHE=[];

const APP_PREFIX = 'Budget Tracker-';
const VERSION= 'verson_01';
const CACHE_NAME = APP_PREFIX + VERSION;



self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
      )
});
caches.match(e.request).then(function (request) {
    if (request) {
      console.log('responding with cache : ' + e.request.url)
      return request
    } else {
      console.log('file is not cached, fetching : ' + e.request.url)
      return fetch(e.request)
    }
})