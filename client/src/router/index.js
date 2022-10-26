import { createRouter, createWebHashHistory } from 'vue-router';
import MapView from '../views/MapView.vue';
// import ChooseCity from '../components/ChooseCity.vue';
import pinia from '@/store/constructor';
import useMainStore from '@/store';
import { ElNotification } from 'element-plus';

const routes = [
  {
    path: '/',
    redirect: 'map',
    // redirect: 'choose-city',
  },
  // TODO: add all new paths when extending cities
  // {
  //   path: '/choose-city',
  //   name: 'choose-city',
  //   component: ChooseCity,
  // },
  {
    path: '/map',
    name: 'map',
    component: MapView,
    beforeEnter: () => {
      const store = useMainStore(pinia);

      if (!store.chosenCity) {
        ElNotification({
          title: "Can't go to the map",
          message: 'You need to choose a city first.',
          type: 'warning',
        });
        return { name: 'choose-city' };
      }
    },
  },
  // {
  //   path: '/create-event',
  //   name: 'createEvent',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/CreateEventView.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
