import BudgetResource from '../../api/budget.service'

function reset () {
  return {
    budgets: [],
    activeBudget: {},
    activeBudgetID: "0",
  }
}
export default {
  state: reset(),
  getters: {
    budgets: state => state.budgets,
    activeBudgetID: state => state.activeBudgetID,
    activeBudget: state => state.activeBudget,
  },
  mutations: {
    SET_BUDGETS: (state, budgets) => {
      state.budgets = budgets
    },
    RESET_BUDGETSTATE: (state) => {
      Object.assign(state, reset())
    },
    SET_ACTIVEBUDGETID: (state, id) => {
      state.activeBudgetID = id
      state.budgets.forEach(budget => {
        if (budget.id == id) {
          state.activeBudget = budget
        }
      });
    },
    CREATE_BUDGET: (state, budget) => {
      state.budgets.push(budget)
    },
    UPDATE_BUDGET: (state, budget) => {
      state.budgets = state.budgets.filter(item => item.id !== budget.id)
      state.budgets.push(budget)
      if (state.activeBudget.id == budget.id) {
        state.activeBudget = budget
      }
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
    setActiveBudgetID: ({ commit, state, dispatch }, budgetID) => {
      commit('SET_ACTIVEBUDGETID', budgetID)
      dispatch('getEmployees', {budgetID: budgetID})
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
          return response.data
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
          return response.data
        })
        .catch(err => {
          throw err
        })
    },
  }
}
