import Vue from 'vue'
import Router from 'vue-router'
import Stats from '@/components/Stats'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Stats',
      component: Stats
    }
  ]
})
