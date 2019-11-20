//FIXME : DEPRECATE OR DEVELOP IT

export const routesProfile = [
  {
    path: '/profile',
    name: 'Your Profile',
    component: () => import(
      /* webpackChunkName: "group-account" */
      '../views/account/Profile.vue'
    ),
    meta: {
      requiresAuth: true,
      title: 'Pipauls - Profile'
    }
  }
]
