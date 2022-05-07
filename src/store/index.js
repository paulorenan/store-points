import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router';

const URL = 'https://store-points-back.herokuapp.com/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    loggingIn: false,
    loginError: false,
    registeringIn: false,
    registerError: false,
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
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios.post(`${URL}/login`, {
        ...loginData
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        commit('loginStop', false);
        commit('updateToken', response.data.token);
        commit('updateUser', response.data.user);
        router.push('/products');
      })
      .catch(() => {
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
    }
  }
})
