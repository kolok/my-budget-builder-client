/** Store **/
import store from '../store/'

export const routesAuth = [
  {
    path: '/login',
    component: () => import(
      /* webpackChunkName: "group-account" */
      '../views/account/Login.vue'
    ),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/hiringPlan')
      } else {
        next()
      }
    },
    meta: {
      requiresAuth: false,
      title: 'Komber - Sign in'
    }
  },
  {
    path: '/signup',
    component: () => import(
      /* webpackChunkName: "group-account" */
      '../views/account/Signup.vue'
    ),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/hiringPlan')
      } else {
        next()
      }
    },
    meta: {
      requiresAuth: false,
      title: 'Komber - Sign up'
    }
  },
]
