import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
  timeout: 3000,
  position: 'top-right',
};

app.use(Toast, options);
app.use(router)

app.mount('#app')
