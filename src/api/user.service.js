import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let UserResource = {
  getMe() { // Get current user
    return HTTP.get('users/me')
  },

  list() { // Show all the users
    return HTTP.get('users')
  },

  get(id) { // Get a specific user
    return HTTP.get('users/' + id)
  },

  create(body) { // Create a user
    return HTTP.post('users', body)
  },

  delete(id) { // Delete a user
    return HTTP.delete('users/' + id)
  },

  update(id, body) { // Update a user
    return HTTP.put('users/' + id, body)
  },
}

export default UserResource
