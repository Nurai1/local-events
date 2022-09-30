import { createApp } from 'vue';
import './styles/element/index.scss';
import ElementPlus from 'element-plus';
import pinia from '@/store/constructor';
import App from './App.vue';
import router from './router';

createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app');
