// Older browser support fix
import 'es6-promise/auto'

import Vue from 'vue'

/** VueI18n library to handle internationnalization **/
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

/** ElementUI library **/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Create VueI18n instance with options
import { i18n } from './i18n/index.js'

/** Load App **/
import App from './App.vue'

/** Router **/
//import router from './routes/index'
import router from './router'

/** Store and Authentication API **/
import store from './store/'
import AuthService from './api/auth.service'

/** Style **/
import style from './styles/main.scss';

/** Highcharts **/
import Highcharts from "highcharts";
import Sunburst from "highcharts/modules/sunburst";
//import Gantt from "highcharts/modules/gantt";
//import XRange from "highcharts/modules/xrange";
//import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";

//Gantt(Highcharts);
//XRange(Highcharts);
Sunburst(Highcharts);
Vue.use(HighchartsVue);

/** Manage ElementUI loading and locale **/
Vue.use(ElementUI);

//Overdefine $notify to manage specificity from 1 place
import CS from './utils/Notification.js'
Vue.prototype.$cs = CS;

function initialisation() {
  new Vue({
    el:'#app',
    i18n,
    router,
    store,
    render: h=>h(App)
  })
}

(function () {
  if (localStorage.getItem('accessToken')) {
    return AuthService.getCurrentUser()
      .then(user => {
        store.dispatch('autoLogin', user)
        initialisation()
      })
      /*eslint no-unused-vars: ["error", {"args": "none"}]*/
      .catch(err => {
        initialisation()
      })
  } else {
    initialisation()
  }
})()
