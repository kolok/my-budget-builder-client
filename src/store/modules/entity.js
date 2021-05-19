import EntityResource from '../../api/entity.service'
import OfficeResource from '../../api/office.service'

export default {
  state: {
    entities: []
  },
  getters: {
    entities: state => state.entities,
    offices: state => state.entities.map(entity =>
        entity.offices.map(office => {
            office.fullName = [entity.name,office.name].join(' > ')
            office.entity = entity
            return office
        })
    ).flat(),
    applyTaxe: (state, getters, rootState, rootGetters) => (officeID,expense) => {
      let office = rootGetters.offices.find(o => o.id == officeID)
      let entity = office ? office.entity : undefined
      let ratio = entity ? (100 + entity.taxeRate) / 100 : 1
      return ratio * expense
    },
  },
  mutations: {
    SET_ENTITIES: (state, entities) => {
      state.entities = entities
    },
    CREATE_ENTITY: (state, entity) => {
      state.entities.push(entity)
    },
    UPDATE_ENTITY: (state, entity) => {
      state.entities.forEach(item => {
        if (item.id === entity.id) {
          item = entity
        }
      })
    },
    DELETE_ENTITY: (state, id) => {
      state.entities = state.entities.filter(item => item.id !== id)
    },

    /*
     * Manage the Office related interactions
     */
    CREATE_OFFICE: (state, office) => {
      state.entities.forEach(item => {
        if (item.id === office.entityID) {
          item.offices.push(office)
        }
      })
    },
    UPDATE_OFFICE: (state, office) => {
      state.entities.forEach(item => {
        if (item.id === office.entityID) {
          var offices = []
          item.offices.forEach(entityOffice => {
            if (entityOffice.id === office.id) {
              entityOffice = office
            }
          })
        }
      })
    },
    async DELETE_OFFICE (state, office) {
      state.entities.forEach(item => {
        if (item.id === office.entityID) {
          item.offices = item.offices.filter(off => off.id !== office.id)
        }
      })
    },


  },
  actions: {
    getEntitiesWithOffices: ({ commit }) => {
      return EntityResource.listWithOffices()
        .then(response => {
          var entities = response.data
          commit('SET_ENTITIES', entities)
        })
        .catch(err => {
          throw err
        })
    },
    createEntity: ({commit}, entity) => {
      return EntityResource.create(entity)
        .then(response => {
          var entity = response.data
          commit('CREATE_ENTITY', entity)
        })
        .catch(err => {
          throw err
        })
    },
    updateEntity: ({commit}, payload) => {
      return EntityResource.update(payload.id, payload)
        .then(response => {
          commit('UPDATE_ENTITY', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    deleteEntity: ({commit}, id) => {
      return EntityResource.delete(id)
        .then(response => {
          commit('DELETE_ENTITY', id)
        })
        .catch(err => {
          throw err
        })
    },

    /*
     * Manage the Office related interactions
     */
    createOffice: ({commit}, payload) => {
      return OfficeResource.create(payload)
        .then(response => {
          var office = response.data
          commit('CREATE_OFFICE', office)
        })
        .catch(err => {
          throw err
        })
    },
    updateOffice: ({commit}, payload) => {
      return OfficeResource.update(payload.id, payload)
        .then(response => {
          var office = response.data
          commit('UPDATE_OFFICE', office)
          return office
        })
        .catch(err => {
          throw err
        })
    },
    deleteOffice: ({commit}, id) => {
      return OfficeResource.delete(id)
        .then(response => {
          commit('DELETE_OFFICE', response.data)
        })
        .catch(err => {
          throw err
        })
    },

  }
}
