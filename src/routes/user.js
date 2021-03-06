export const routesUser = [
  {
    path: '/users',
    name: 'Users',
    component: () => import(
      '../views/account/users/Users.vue'
    ),
    meta: {
      roles: ['client_admin'],
      requiresAuth: true,
      title: 'Pipauls - Users'
    }
  },
  {
    path: '/users/:id',
    name: 'Edit Users',
    component: () => import(
      '../views/account/users/Edit.vue'
    ),
    meta: {
      roles: ['client_admin'],
      requiresAuth: true,
      title: 'Pipauls - Users'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(
      '../views/account/Account.vue'
    ),
    meta: {
      requiresAuth: true,
      title: 'Pipauls - Account'
    },
    props: true
  },
  {
    path: '/userCreate',
    name: 'userCreate',
    component: () => import(
      '../views/account/users/Create.vue'
    ),
    meta: {
      requiresAuth: true,
      title: 'Pipauls - Create user'
    }
  }
]