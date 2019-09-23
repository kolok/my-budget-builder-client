import Vue from 'vue'
/** Vuex **/
import Vuex from 'vuex'
/** Modules **/
import auth from './modules/auth'
import company from './modules/company'
import country from './modules/country'
import currency from './modules/currency'
import entity from './modules/entity'
import menu from './modules/menu'
import team from './modules/team'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, company, entity, country, currency, menu, team, user}
})
