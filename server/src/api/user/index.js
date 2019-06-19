'use strict'
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const secret = require('../../config').secret.auth
const auth = require('../auth/service')
var User = require('./user.model')
var Company = require('../company/company.model')

let router = new Router({
  prefix: '/api/users'
})

router
/**
 * Get list of users
 * restriction: 'admin'
 */
  .get('/', auth.requiresRole(['admin']), async (ctx) => {
    try {
      // Find users except admin users.
      ctx.body = await User.find({ role: { $ne: 'admin'} }, '-password')
    } catch(err) {
      throw err
    }
  })

// create
  .post('/', async (ctx) => {
    try {
      let user = await User.create(ctx.request.body)
      // Sign token
      let token = await jwt.sign({id: user._id, role: user.role}, secret, {
        expiresIn: '1d'
      })
      ctx.status = 201 // Status code 201 : created
      ctx.body = {token: token}
    } catch(err) {
      throw err
    }
  })

  // create
  .post('/company', async (ctx) => {
    try {
      console.log('+++ Here in post users/company')
      let company = await Company.create({name: ctx.request.body.companyname})
      var userFields = ctx.request.body
      userFields.companyID = company._id
      let user = await User.create(userFields)
      // Sign token
      let token = await jwt.sign({id: user._id, role: user.role}, secret, {
        expiresIn: '1d'
      })
      ctx.status = 201 // Status code 201 : created
      ctx.body = {token: token}
    } catch(err) {
      throw err
    }
  })

// get my info
  .get('/me', auth.isAuthenticated, async (ctx) => {
    try {
      ctx.body = ctx.state.user
    } catch(err) {
      throw err
    }
  })

// get single user
  .get('/:id', auth.isAuthenticated, async (ctx) => {
    try {
      let user = await User.findById({_id: ctx.params.id}, '-password')
      // Handle not found error
      if (!user) { ctx.throw(404, 'not found') }
      ctx.body = user
    } catch(err) {
      throw err
    }
  })

  .put('/me/password', auth.isAuthenticated, async (ctx) => {
    try {
      let user = await User.findById({_id: ctx.state.user._id})

      if(!user) { ctx.throw(404, 'not found') }

      let authenticated =
        await user.comparePassword(ctx.request.body.oldPassword)

      if(!authenticated) {
        ctx.throw(403, 'Old password is not correct.')
      } else {
        user.password = ctx.request.body.newPassword
        user.save()
        ctx.status = 200
      }
    } catch(err) {
      throw err
    }
  })

/**
 * Delete a user
 * restriction: 'admin'
 */
  .delete('/:id', auth.requiresRole(['admin']), async (ctx) => {
    try {
      let user = await User.findById({_id: ctx.params.id})
      // Handle not found error
      if (!user) { ctx.throw(404, 'not found') }
      ctx.body = await user.remove()
    } catch(err) {
      throw err
    }
  })

/****************** Other methods ******************/
/**
 * Creates a new user
 * restriction: 'admin'
 */
/*
 * .post('/signupByAdmin', auth.hasRole('admin'), async (ctx, next) => {
 *     try {
 *         let user = await User.create(ctx.request.body)
 *         ctx.status = 201 // Status code 201 : created
 *         ctx.body = 'User created!'
 *     } catch(err) {
 *         throw err
 *     }
 * })
 */
module.exports = router
