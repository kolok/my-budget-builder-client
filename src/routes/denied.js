export const routesDenied = [
  {
    path: '/denied',
    name: 'Denied',
    component: () => import(
      '../views/account/Denied.vue'
    ),
    meta: {
      requiresAuth: true,
      title: 'Komber - Denied'
    }
  },
]
