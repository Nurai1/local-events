import { createRouter, createWebHashHistory } from 'vue-router';
import MapView from '../views/MapView.vue';
import ChooseCity from '../components/ChooseCity.vue';

const routes = [
  {
    path: '/choose-city',
    name: 'choose-city',
    component: ChooseCity,
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
