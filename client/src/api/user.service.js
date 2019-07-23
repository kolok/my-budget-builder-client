import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let UserResource = {
  get() { // Get current user
    return HTTP.get('users/me')
  }
}

export default UserResource
