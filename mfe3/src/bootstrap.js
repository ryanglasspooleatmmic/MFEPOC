import { createApp } from 'vue'
import App from './App'

const mount = (el, props) => {
    const app = createApp(App, props || {});
    app.mount(el);
}

export { mount }
