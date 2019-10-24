import Vue from 'vue'
/** Vuex **/
import Vuex from 'vuex'
/** Modules **/
import auth from './modules/auth'
import budget from './modules/budget'
import company from './modules/company'
import country from './modules/country'
import currency from './modules/currency'
import entity from './modules/entity'
import team from './modules/team'
import user from './modules/user'
import employee from './modules/employee'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, budget, company, entity, country, currency, team, user, employee}
})
