import { defineAsyncComponent } from "vue";

async function loadComponent(scope, module) {
  await __webpack_init_sharing__('default');
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const built = factory();
  return built?.default;
}

const urlCache = new Map();
const loadVueScript = (url) => {
  return new Promise((resolve) => {
      if (!url) resolve(null);

      let errorLoading = false;
      if (urlCache.has(url)) {
      resolve(urlCache.get(url));
      }

      const element = document.createElement('script');

      element.src = url;
      element.type = 'text/javascript';
      element.async = true;

      const cleanup = () => {
      document.head.removeChild(element);
      };

      element.onload = () => {
      const result = { ready: true, errorLoading };
      urlCache.set(url, result);
      cleanup();
      resolve(result);
      };

      element.onerror = () => {
      const result = { ready: false, errorLoading: false }
      urlCache.set(url, result);
      cleanup();
      resolve(result);
      };

      document.head.appendChild(element);
  });
};

export const getVueComponent = async (remoteUrl, scope, module) => {
  const { ready } = await loadVueScript(remoteUrl);
  if (ready) {
    const loaded = await loadComponent(scope, module);
    return loaded;
  }

  return null;
};
