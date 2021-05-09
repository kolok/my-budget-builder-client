import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let EmployeeResource = {
  getMe() { // Get current employee
    return HTTP.get('employees/me')
  },

  list(params) { // Show all the employees
    return HTTP.get('employees', {params: params} )
  },

  get(id) { // Get a specific employee
    return HTTP.get('employees/' + id)
  },

  create(body) { // Create a employee
    return HTTP.post('employees', body)
  },

  delete(id) { // Delete a employee
    return HTTP.delete('employees/' + id)
  },

  update(id, body) { // Update a employee
    return HTTP.put('employees/' + id, body)
  },
}

export default EmployeeResource
