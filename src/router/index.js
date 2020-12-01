import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home')
  },
  {

    path: '/login',
    name: 'login',
    component: () => import('../components/UserAuth')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/Dashboard')
  },
  {
    path:'/item/:id',
    name:'edit',
    component: ()=> import('../components/ItemEdit')
  },
  {
    path:'/item-add',
    name:'add',
    component: ()=> import('../components/AddItem')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !sessionStorage.getItem('token')) {
      next({ name: 'login' });
  } else if (to.name==='home' && sessionStorage.getItem('token')) {
      next({ name: 'dashboard' });
  } else {
      next();
  }
});
export default router