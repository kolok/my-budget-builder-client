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
      title: 'Pipauls - Sign in'
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
      title: 'Pipauls - Sign up'
    }
  },
  {
    path: '/forgotPassword',
    component: () => import(
      /* webpackChunkName: "group-account" */
      '../views/account/ForgotPassword.vue'
    ),
    meta: {
      requiresAuth: false,
      title: 'Pipauls - Forgot Password'
    }
  },
  {
    path: '/updatePassword',
    component: () => import(
      /* webpackChunkName: "group-account" */
      '../views/account/updatePassword.vue'
    ),
    meta: {
      requiresAuth: false,
      title: 'Pipauls - Sign up'
    }
  }
]
