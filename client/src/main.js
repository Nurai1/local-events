import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import ElementPlus from 'element-plus';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import './styles/element/index.scss';
import pinia from '@/store/constructor';
import App from './App.vue';
import router from './router';
import apolloClient from '@/apollo/apolloClient';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app
  .component('DatePicker', Datepicker)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
