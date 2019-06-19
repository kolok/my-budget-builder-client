import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
/** Router **/
import router from './router'
/** Store **/
import store from './store/'
import AuthService from './api/auth.service'
/** Style **/
import './styles/index.less'
/** iView **/
import { Button, Input, Row, Col, Card, Message, locale } from 'iview'
// Configure iView language
import lang from 'iview/dist/locale/en-US'
locale(lang)
/*
 * FIXME: We would prefer ElementUI
 * FIXME: iview import would become useless
 * Import iView on demand, below is generally used components.
 */
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Card', Card)
Vue.prototype.$Message = Message

/*
 * FIXME: use babel plugin : https://element.eleme.io/#/fr-FR/component/quickstart
 */
Vue.use(ElementUI);

function initialisation() {
  new Vue({
    el:'#app',
    router,
    store,
    render: h=>h(App)
  })
}

(function () {
  if (localStorage.getItem('token')) {
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
