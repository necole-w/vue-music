import { createRouter, createWebHashHistory } from 'vue-router'
// import Fand from '@/view/fand/fand-vue.vue'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "fand" */ '@/components/login-vue.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import(/* webpackChunkName: "fand" */ '@/play/play-vue.vue')
  },
  {
    path: '/home',
    name: 'home',
    children: [
      {
        path: '/index',
        name: 'index',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "fand" */ '@/view/index/index-vue.vue')
      }

    ],
    component: () => import(/* webpackChunkName: "fand" */ '@/components/home-vue.vue')
  }
// document.cookie
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = document.cookie
  if (!tokenStr) return next('/login')
  next()
})

export default router
