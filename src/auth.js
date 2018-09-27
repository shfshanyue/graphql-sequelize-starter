const jwt = require('jsonwebtoken')
const config = require('../config')

function verify (token) {
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (e) {
    return null
  }
}

module.exports = {
  verify
}
