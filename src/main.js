import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/element/index.scss';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app');
