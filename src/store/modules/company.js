import CompanyResource from '../../api/company.service'

export default {
  state: {
    all: []
  },
  getters: {
    companies: state => state.all,
    getCompanyCurrency: (state, getters, rootState, rootGetters) => {
      let company = rootGetters.getCurrentCompany
      let currency = rootGetters.getCurrencyById(company.defaultCurrencyID)
      return currency.symbol
    }
  },
  mutations: {
    UPDATE_COMPANY: (state, company) => {
      state.all.forEach(item => {
        if (item._id === company._id) {
          item.name = company.name
          item.info = company.info
        }
      })
    }
  },
  actions: {
    updateCompany: ({commit}, payload) => {
      return CompanyResource.update(payload._id, payload.content)
        .then(response => {
          commit('UPDATE_COMPANY', response.data)
        })
        .catch(err => {
          throw err
        })
    }
  }
}
