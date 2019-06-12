/**
 * Entry file
 */

/*
 * CREATE a .env file under server folder, and  copy and paste the contents of
 * .env.default file into this .env, and assign values
 */

/*
 * Should not use .env files in your production environment though
 * and rather set the values directly on the respective host.
 */

if (process.env.NODE_ENV !== 'production') {
  const config = require('dotenv').config()
  if (config.error) {
    throw config.error
  }
}
require('./main')
