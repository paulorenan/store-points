import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import(/* webpackChunkName: "about" */ '../views/ProductsView.vue')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(store.state.load === false) {
    store.dispatch('fetchLoading')
  }
  store.dispatch('fetchAccessToken');
  if(store.state.token) {
    if(to.name === 'login' || to.name === 'register') {
      next('/products');
    } else {
      next();
    }
  } else {
    if(to.name === 'login' || to.name === 'register') {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;