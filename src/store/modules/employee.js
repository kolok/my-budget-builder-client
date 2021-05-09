import EmployeeResource from '../../api/employee.service'

export default {
  state: {
    employees: []
  },
  getters: {
    employees: state => state.employees,
    getPayrollAmount: () => employee => {
      let payroll = employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'payroll') : undefined
      return payroll ? payroll.amount : 0
    },
    getTotalPayrollAmount: () => employees => {
      let payrolls = employees.map( employee =>
        employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'payroll') : undefined
      ).filter( payroll => payroll !== undefined )
      return payrolls.reduce((a,b) => a + b.amount, 0)
    },
    getBonusAmount: () => employee => {
      let bonus = employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'bonus') : undefined
      return bonus ? bonus.amount : 0
    },
    getTotalBonusAmount: () => employees => {
      let bonus = employees.map( employee =>
        employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'bonus') : undefined
      ).filter( payroll => payroll !== undefined )
      return bonus.reduce((a,b) => a + b.amount, 0)
    },
    getExpensesAmount: () => employee => {
        return employee.expenses.reduce( (a,b) => a + b.amount, 0 )
    },
  },
  mutations: {
    SET_USERS: (state, employees) => {
      state.employees = employees
    },
    CREATE_USER: (state, employee) => {
      state.employees.push(employee)
    },
    UPDATE_USER: (state, employee) => {
      state.employees.forEach(item => {
        if (item.id === employee.id) {
          item = employee
        }
      })
    },
    DELETE_USER: (state, id) => {
      state.employees = state.employees.filter(item => item.id !== id)
    },
  },
  actions: {
    getEmployees: ({ commit }, params) => {
      return EmployeeResource.list(params)
        .then(response => {
          var employees = response.data
          commit('SET_USERS', employees)
          return response.data
        })
        .catch(err => {
          throw err
        })
    },
    getEmployee: ({}, employeeID) => {
      return EmployeeResource.get(employeeID)
        .then(response => {
          return response.data
        })
        .catch(err => {
          throw err
        })
    },
    createEmployee: ({commit}, employee) => {
      return EmployeeResource.create(employee)
        .then(response => {
          var employee = response.data
          commit('CREATE_USER', employee)
        })
        .catch(err => {
          throw err
        })
    },
    updateEmployee: ({commit}, payload) => {
      return EmployeeResource.update(payload.id, payload)
        .then(response => {
          commit('UPDATE_USER', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteEmployee: ({commit}, id) => {
      return EmployeeResource.delete(id)
        .then(response => {
          commit('DELETE_USER', id)
        })
        .catch(err => {
          throw err
        })
    },
  }
}
