async function loadMount(scope, module) {
    await __webpack_init_sharing__('default');
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory()?.mount;
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

const cache = new Map();
export const getVueComponentMount = async (remoteUrl, scope, module) => {
    const key = `${remoteUrl}-${scope}-${module}`;    
    if (cache.has(key)) return {
        errorLoading: false,
        mount: cache.get(key)
    };

    const { ready, errorLoading } = await loadVueScript(remoteUrl);
    if (ready) {
        const mount = await loadMount(scope, module);
        cache.set(key, mount);
        return { errorLoading, mount };
    }

    return { errorLoading, mount: null };
};
