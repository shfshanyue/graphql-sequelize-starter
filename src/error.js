const _ = require('lodash')

const errors = {
  INVALID_TOKEN: { message: 'invalid token', httpStatus: 401 },
  PERMISSION_DENY: { message: 'permission deny', httpStatus: 403 }
}

class Exception extends Error {
  constructor (code, data = {}) {
    const message = _.get(errors[code], 'message', code)
    super(message)
    this.name = 'Exception'
    this.message = message

    // 供 sentry 调试使用
    this.data = data

    // 供 chrome network console 调试使用
    this.httpStatus = _.get(errors[code], 'httpStatus', 400)
  }
}

module.exports = Exception
