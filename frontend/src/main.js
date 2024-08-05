import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
//# sourceMappingURL=main.js.map