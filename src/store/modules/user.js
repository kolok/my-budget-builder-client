import UserResource from '../../api/user.service'

export default {
  state: {
    users: []
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users
    },
    CREATE_USER: (state, user) => {
      state.users.push(user)
    },
    UPDATE_USER: (state, user) => {
      state.users.forEach(item => {
        if (item.id === user.id) {
          item = user
        }
      })
    },
    DELETE_USER: (state, id) => {
      state.users = state.users.filter(item => item.id !== id)
    },
  },
  actions: {
    getUsers: ({ commit }) => {
      return UserResource.list()
        .then(response => {
          var users = response.data
          commit('SET_USERS', users)
        })
        .catch(err => {
          throw err
        })
    },
    getUser: ({ commit }, userID) => {
      return UserResource.get(userID)
        .then(response => {
          var user = response.data
          if (
            user.userCompanies !== undefined &&
            user.userCompanies[0] !== undefined
          ) {
            user.role = user.userCompanies[0].role
          } else {
            user.role = "client_user"
          }
          return user
        })
        .catch(err => {
          throw err
        })
    },
    createUser: ({commit}, user) => {
      return UserResource.create(user)
        .then(response => {
          var user = response.data
          commit('CREATE_USER', user)
        })
        .catch(err => {
          throw err
        })
    },
    updateUser: ({commit}, payload) => {
      return UserResource.update(payload.id, payload)
        .then(response => {
          commit('UPDATE_USER', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteUser: ({commit}, id) => {
      return UserResource.delete(id)
        .then(response => {
          commit('DELETE_USER', id)
        })
        .catch(err => {
          throw err
        })
    },
  }
}
