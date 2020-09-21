const staticCacheName = "site-static-v1";
const dynamicCache = "dynamic-static-v1";
const assets = [
  "/",
  "/index.html",
  "/script.js",
  "/app.js",
  "/style.css",
  "/images/Afternoon.png",
  "/images/app-background.png",
  "/images/Asset 1.png",
  "/images/Morning.png",
  "/images/Night.png",
  "/images/Sunset.png",
  "/icons/cloud.svg",
  "/icons/history.svg",
  "/icons/humidity.svg",
  "/icons/magnifying-glass.svg",
  "/icons/pressure.svg",
  "/icons/refresh (1).svg",
  "/icons/refresh.svg",
  "/icons/save-button.svg",
  "/icons/weather refresh.svg",
  "/icons/wind.svg",
  "/icons/windsock.svg",
  // "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700&display",
  // "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700&display=swap",
  // "https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8cce9I9s.woff2",
  // "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9yAs5tU1E.woff2",
  // "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85tU1E.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9yAs5iU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9yAs5jU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9yAs5tU1E.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8WAc5iU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8WAc5jU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8WAc5tU1E.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8cceyI9tScg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8ccezI9tScg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8cce9I9s.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85iU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85jU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85tU1E.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8GBs5iU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8GBs5jU1EQVg.woff2",
  "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8GBs5tU1E.woff2",
  // "https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8cce9I9s.woff2",
  // "https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9yAs5tU1E.woff2",
  "https://cdn.loom.com/assets/fonts/inter/Inter-UI-Regular.woff2",
];

//install service workers
self.addEventListener("install", (evt) => {
  console.log("Service Worker has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

//activate service worker
self.addEventListener("activate", (evt) => {
  // console.log("Service worker has been activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key === dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//register service worker with fetch api
self.addEventListener("fetch", (evt) => {
  //   console.log("fetch", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
