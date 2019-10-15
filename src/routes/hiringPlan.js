export const routesHiringPlan = [
  {
    path: '/hiringPlan',
    name: 'HiringPlan',
    component: () => import(
      '../views/hiringPlan/Dashboard.vue'
    ),
    meta: {
      requiresAuth: true,
      title: 'PiPauls - HiringPlan'
    }
  },
]
