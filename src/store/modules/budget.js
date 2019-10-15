import BudgetResource from '../../api/budget.service'
import OfficeResource from '../../api/office.service'

export default {
  state: {
    budgets: [],
    activeBudgetID: 0,
  },
  getters: {
    budgets: state => state.budgets,
    activeBudgetID: state => state.activeBudgetID,
  },
  mutations: {
    SET_BUDGETS: (state, budgets) => {
      state.budgets = budgets
    },
    SET_ACTIVEBUDGETID: (state, id) => {
      state.activeBudgetID = id
    },
    CREATE_BUDGET: (state, budget) => {
      state.budgets.push(budget)
    },
    UPDATE_BUDGET: (state, budget) => {
      state.budgets = state.budgets.filter(item => item.id !== budget.id)
      state.budgets.push(budget)
      // TODO: sort by ?
    },
    DELETE_BUDGET: (state, budget) => {
      state.budgets = state.budgets.filter(item => item.id !== budget.id)
    },
  },
  actions: {
    getBudgets: ({ commit }) => {
      return BudgetResource.list()
        .then(response => {
          var budgets = response.data
          commit('SET_BUDGETS', budgets)
          return budgets
        })
        .catch(err => {
          throw err
        })
    },
    getBudget: ({ commit }, budgetID) => {
      return BudgetResource.get(budgetID)
        .catch(err => {
          throw err
        })
    },
    setActiveBudgetID: ({ commit, state }, budgetID) => {
      commit('SET_ACTIVEBUDGETID', budgetID)
      return state.activeBudgetID
    },
    createBudget: ({commit}, budget) => {
      return BudgetResource.create(budget)
        .then(response => {
          var budget = response.data
          commit('CREATE_BUDGET', budget)
          return budget
        })
        .catch(err => {
          throw err
        })
    },
    updateBudget: ({commit}, budget) => {
      return BudgetResource.update(budget.id, budget)
        .then(response => {
          commit('UPDATE_BUDGET', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteBudget: ({commit}, id) => {
      return BudgetResource.delete(id)
        .then(response => {
          commit('DELETE_BUDGET', response.data)
        })
        .catch(err => {
          throw err
        })
    },
  }
}