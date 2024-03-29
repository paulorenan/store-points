import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router';

// const URL = 'https://store-points-back.herokuapp.com/api';
const URL = 'https://store-points-back.vercel.app/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    loggingIn: false,
    loginError: false,
    registeringIn: false,
    registerError: false,
    products: [],
    load: false,
  },
  mutations: {
    loginStart: (state) => { 
      state.loggingIn = true;
      state.loginError = false;
    },
    loginStop: (state, error) => {
      state.loggingIn = false;
      state.loginError = error;
    },
    registerStart: (state) => {
      state.registeringIn = true;
      state.registerError = false;
    },
    registerStop: (state, error) => {
      state.registeringIn = false;
      state.registerError = error;
    },
    updateToken: (state, token) => {
      state.token = token;
    },
    updateUser: (state, user) => {
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    updateProducts: (state, products) => {
      state.products = products;
    },
    loadSuccess: (state) => {
      state.load = true;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios.post(`${URL}/login`, {
        ...loginData
      }).then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        commit('loginStop', false);
        commit('updateToken', response.data.token);
        commit('updateUser', response.data.user);
        router.push('/products');
      }).catch(() => {
        commit('loginStop', true);
        commit('updateToken', null);
        commit('updateUser', null);
      })
    },
    doRegister({ commit }, registerData) {
      commit('registerStart');
      axios.post(`${URL}/users`, {
        ...registerData
      }).then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        commit('registerStop', false);
        commit('updateToken', response.data.token);
        commit('updateUser', response.data.user);
        router.push('/products');
      }).catch(() => {
        commit('registerStop', true);
        commit('updateToken', null);
        commit('updateUser', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateToken', localStorage.getItem('token'));
      commit('updateUser', JSON.parse(localStorage.getItem('user')));
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('logout');
      router.push('/login');
    },
    fetchProducts({ commit }) {
      axios.get(`${URL}/products`).then(response => {
        commit('updateProducts', response.data.products);
      }).catch(() => {
        commit('updateProducts', []);
      })
    },      
    fetchLoading({ commit }) {
      const token = localStorage.getItem('token');
      if(token) {
        axios.defaults.headers.common['Authorization'] = token;
        axios.get(`${URL}/load`).then(response => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          commit('updateToken', response.data.token);
          commit('updateUser', response.data.user);
          commit('loadSuccess');
        }).catch(() => {
          this.dispatch('logout');
        });
      } else {
        commit('loadSuccess');
      }
    },
  }
})
