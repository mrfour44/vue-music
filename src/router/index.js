import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: resolve => require(['@/components/rank/rank.vue'], resolve),
      children: [
        {
          path: ':id',
          component: resolve => require(['@/components/top-list/top-list.vue'], resolve)
        }
      ]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: resolve => require(['@/components/recommend/recommend.vue'], resolve),
      children: [
        {
          path: ':id',
          component: resolve => require(['@/components/disc/disc.vue'], resolve)
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/components/search/search.vue'], resolve)
    },
    {
      path: '/singer',
      name: 'singer',
      component: resolve => require(['@/components/singer/singer.vue'], resolve),
      children: [
        {
          path: ':id',
          component: resolve => require(['@/components/singer-detail/singer-detail.vue'], resolve)
        }
      ]
    }
  ]
})
