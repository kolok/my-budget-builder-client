import moment from 'moment'
import EmployeeResource from '../../api/employee.service'

function getNbMonths(employee, activeBudget) {
  let months = 12
  if (activeBudget && activeBudget.startDate && activeBudget.endDate) {
    // min employee startdate 
    let startDate = employee.startDate ? moment.max(moment(activeBudget.startDate), moment(employee.startDate)) : moment(activeBudget.startDate)
    let endDate = employee.endDate ? moment.min(moment(activeBudget.endDate), moment(employee.endDate)).add(1,'d') : moment(activeBudget.endDate).add(1,'d')
    months = endDate.diff(startDate, 'months')
  }
  return months
}

export default {
  state: {
    employees: []
  },
  getters: {
    employees: state => state.employees,
    getPayrollAmount: (state, getters, rootState, rootGetters) => (employee, applyBudget) => {
      let months = getNbMonths(employee, applyBudget ? rootGetters.activeBudget : undefined)
      let payroll = employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'payroll') : undefined
      return payroll ? payroll.amount/12*months : 0
    },
    getPayrollAmountWithTaxe: (state, getters, rootState, rootGetters) => (employee, applyBudget) => {
      return getters.getPayrollAmount(employee, applyBudget) * getOfficeRatio(rootGetters.offices, employee)
    },
    getTotalPayrollAmount: (state, getters, rootState, rootGetters) => employees => {
      let payrolls = employees.map( employee => getters.getPayrollAmount(employee, true))
      return payrolls.reduce((a,b) => a + b, 0)
    },
    getTotalPayrollAmountWithTaxe: (state, getters, rootState, rootGetters) => employees => {
      let payrolls = employees.map( employee => getters.getPayrollAmountWithTaxe(employee, true))
      return payrolls.reduce((a,b) => a + b, 0)
    },

    getBonusAmount: (state, getters, rootState, rootGetters) => (employee, applyBudget) => {
      let months = getNbMonths(employee, applyBudget ? rootGetters.activeBudget : undefined)
      let bonus = employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'bonus') : undefined
      return bonus ? bonus.amount/12*months : 0
    },
    getBonusAmountWithTaxe: (state, getters, rootState, rootGetters) => (employee, applyBudget) => {
      return getters.getBonusAmount(employee, applyBudget) * getOfficeRatio(rootGetters.offices, employee)
    },
    getTotalBonusAmount: (state, getters, rootState, rootGetters) => employees => {
      let bonus = employees.map( employee => getters.getBonusAmount(employee, true))
      return bonus.reduce((a,b) => a + b, 0)
    },
    getTotalBonusAmountWithTaxe: (state, getters, rootState, rootGetters) => employees => {
      let bonus = employees.map( employee => getters.getBonusAmountWithTaxe(employee, true))
      return bonus.reduce((a,b) => a + b, 0)
    },

    getExpensesAmount: (state, getters, rootState, rootGetters) => (employee, applyBudget) => {
      let months = getNbMonths(employee, applyBudget ? rootGetters.activeBudget : undefined)
      return employee.expenses.reduce( (a,b) => a + b.amount, 0 )/12*months
    },
    getExpensesAmountWithTaxe: (state, getters, rootState, rootGetters) => (employee, applyBudget) => {
      return getters.getExpensesAmount(employee, applyBudget) * getOfficeRatio(rootGetters.offices, employee)
    },
},
  mutations: {
    SET_EMPLOYEES: (state, employees) => {
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
          commit('SET_EMPLOYEES', employees)
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
    deleteEmployee: ({commit}, id) => {
      return EmployeeResource.delete(id)
        .then(() => {
          commit('DELETE_USER', id)
        })
        .catch(err => {
          throw err
        })
    },
  }
}

function getOfficeRatio(offices, employee) {
  if (employee.taxeRate === undefined) {
    let office = offices.find(o => o.id == employee.officeID)
    let entity = office ? office.entity : undefined
    employee.taxeRate = entity ? (100 + entity.taxeRate) / 100 : 1
  }
  return employee.taxeRate
}
