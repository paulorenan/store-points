import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router';

const URL = 'https://store-points-back.herokuapp.com/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    loggingIn: false,
    loginError: null,
    user: null,
  },
  mutations: {
    loginStart: (state) => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
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
        commit('loginStop', null);
        commit('updateToken', response.data.token);
        commit('updateUser', response.data.user);
        router.push('/users');
      })
      .catch(error => {
        commit('loginStop', error.response.data.error);
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
