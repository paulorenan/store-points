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
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ '../views/UsersView.vue')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if(store.state.token) {
    if(to.name === 'login' || to.name === 'register') {
      next('/users');
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