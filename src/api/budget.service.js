/**
 * GET      /api/budgets         -> index
 * POST     /api/budgets         -> create
 * GET      /api/budgets/:id     -> show
 * PUT      /api/budgets/:id     -> update
 * DELETE   /api/budgets/:id     -> delete
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let BudgetResource = {

  list() { // Show all the budgets
    return HTTP.get('budgets')
  },

  get(id) { // Get a specific budget
    return HTTP.get('budgets/' + id)
  },

  create(body) { // Create a budget
    return HTTP.post('budgets', body)
  },

  delete(id) { // Delete a budget
    return HTTP.delete('budgets/' + id)
  },

  update(id, body) { // Update a budget
    return HTTP.put('budgets/' + id, body)
  }
}

export default BudgetResource
