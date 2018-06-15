import Vue from 'vue';
import Router from 'vue-router';
import Contributors from '@/components/Contributors';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Contributors',
      component: Contributors
    }
  ]
});
