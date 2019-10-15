export const routesEmployee = [
    {
        path: '/employees',
        name: 'Employees',
        component: () => import(
          '../views/employees/Employees.vue'
        ),
        meta: {
          roles: ['client_admin'],
          requiresAuth: true,
          title: 'Komber - Employees'
        }
      },
      {
        path: '/employees/:id',
        name: 'Edit Employees',
        component: () => import(
          '../views/employees/Edit.vue'
        ),
        meta: {
          roles: ['client_admin'],
          requiresAuth: true,
          title: 'Komber - Employees'
        }
      },
      {
        path: '/employeeCreate',
        name: 'employeeCreate',
        component: () => import(
          '../views/employees/Create.vue'
        ),
        meta: {
          requiresAuth: true,
          title: 'Komber - Create employee'
        }
      } 
    ]