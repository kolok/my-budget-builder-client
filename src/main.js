// Older browser support fix
import 'es6-promise/auto'

import Vue from 'vue'

/** VueI18n library to handle internationnalization **/
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

/** ElementUI library **/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/** Google Chart library **/
//import VueGoogleCharts from 'vue-google-charts'
//Vue.use(VueGoogleCharts)

/** EChart library **/
//import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
//import 'echarts/lib/chart/bar'
//import 'echarts/lib/chart/pie'
//import 'echarts/lib/component/tooltip'

// Create VueI18n instance with options
import { i18n } from './i18n/index.js'

/** Load App **/
import App from './App.vue'

/** Router **/
import router from './router'

/** Store and Authentication API **/
import store from './store/'
import AuthService from './api/auth.service'

/** Style **/
import style from './styles/main.scss';

/*
 * FIXME: Babel could be updated
 * FIXME: use babel plugin : https://element.eleme.io/#/fr-FR/component/quickstart
 */

/** Manage ElementUI loading and locale **/
Vue.use(ElementUI);
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang)

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
