/**
 * pwa的worker
 */
interface ExtendableEvent {
  waitUntil: (res: Promise<void>) => void
}


interface ServiceWorkerGlobalScope extends EventTarget {
  registration: ServiceWorkerRegistration;
  serviceWorker: ServiceWorker;
}

const hasWaitUntil = <T extends object> (event: T): event is (T & ExtendableEvent) => {
  if ('waitUntil' in event && event.waitUntil instanceof Function) {
    return true;
  }
  return false;
}


const addResourcesToCache = async (resources: string[]) => {
  const cache = await caches.open("v1.1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  if (!hasWaitUntil(event)) {
    return;
  }
  event.waitUntil(
    addResourcesToCache([
      "/index.html",
    ]),
  );

});



// 启用导航预加载
const enableNavigationPreload = async () => {
  if (!(self instanceof Object && Object.getOwnPropertyDescriptor(self, 'registration'))) {
    return;
  }
  await (self as unknown as ServiceWorkerGlobalScope).registration.navigationPreload.enable();

};


self.addEventListener('activate', (event) => {
  console.log('self', self)

  if (!hasWaitUntil(event)) {
    return;
  }
  event.waitUntil(enableNavigationPreload());
});


self.addEventListener('fetch', (event) => {

});
