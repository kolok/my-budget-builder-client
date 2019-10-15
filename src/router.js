import Vue from 'vue'
/** Router **/
import VueRouter from 'vue-router'
/** Route **/
import { routesEmployee } from './routes/employee'
import { routesUser } from './routes/user'
import { routesDenied } from './routes/denied'
import { routesDefault } from './routes/default'
import { routesHiringPlan } from './routes/hiringPlan'
import { routesAuth } from './routes/auth'
import { routesProfile } from './routes/profile'

/** Store **/
import store from './store/'

/** Vue Router **/
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    ...routesEmployee,
    ...routesUser,
    ...routesDenied,
    ...routesDefault,
    ...routesHiringPlan,
    ...routesAuth,
    ...routesProfile,
  ]
})

router.beforeEach((to, from, next) => {
  // FIXME: Start our vue-progressbar ?
  //router.app.$Progress.start()

  // To set the title of each route
  document.title = to.meta.title

  // If doesn't require authentication, accept.
  if (!to.meta.requiresAuth) {
    return next()
  }
  // If require auth but user is not authenticated, go to login.
  if (!store.getters.isAuthenticated) {
    return next('/login')
  }
  // If user is authenticated and page doesn't define roles, accept.
  if(!to.meta.roles) {
    return next()
  }
  // If page defines roles, check if user type is included in the roles.
  if (to.meta.roles.includes(store.getters.getCurrentUserCompany.role)) {
    return next()
  }
  // Otherwise, denied.
  next('/denied')
})

router.afterEach((to, from) => {
    // FIXME: End our vue-progressbar ?
    // router.app.$Progress.finish()
})

export default router
