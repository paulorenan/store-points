import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  icons: {
    iconfont: 'md' || 'fa',
  },
  render: h => h(App)
}).$mount('#app')
