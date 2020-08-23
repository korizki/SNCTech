const CACHE_NAME = "firstpwa";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/assets/icon/aruba.png",
    "/assets/icon/infinet.png",
    "/assets/icon/MPPT.png",
    "/assets/icon/logo.png",
    "/assets/icon/SNC.png",
    "/assets/illus/analys.jpg",
    "/assets/illus/build.jpg",
    "/assets/illus/config.jpg",
    "/assets/illus/deploy.jpg",
    "/assets/illus/dispatch.jpg",
    "/assets/illus/repair.jpg",
    "/assets/illus/teamwork.jpg",
    "/assets/illus/trouble.jpg",
    "/css/fontawesome.min.css",
    "/css/materialize.min.css",
    "/css/mppt.css",
    "/css/responsive.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/about.html",
    "/pages/AP.html",
    "/pages/home.html",
    "/pages/MPPT.html",
    "/pages/report.html",
    "/pages/tool.html",
    "https://kit.fontawesome.com/a076d05399.js",
    "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,500;1,400;1,500&display=swap"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
//menggunakan aset dari cache
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("Gunakan Aset dari cache: ", response.url);
                return response;
            }
            console.log (
                "Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});
//hapus cache lama
self.addEventListener("active", function(event) {
    event.waitUntil(
        cache.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("Service Worker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

