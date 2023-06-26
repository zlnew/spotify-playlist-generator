import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import GetStartedView from '@/views/GetStartedView.vue';
import CallbackView from '@/views/CallbackView.vue';
import RecommendationsView from '@/views/RecommendationsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/callback',
      name: 'callback',
      component: CallbackView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/get-started',
      name: 'get-started',
      component: GetStartedView,
    },
    {
      path: '/recommendations',
      name: 'recommendations',
      component: RecommendationsView,
    },
  ]
});

export default router;
