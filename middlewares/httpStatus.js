const _ = require('lodash')

module.exports = (req, res, next) => {
  const contentType = req.headers['content-type']

  // filter playground response
  if (contentType === 'application/json' || contentType === 'application/graphql') {
    const oldWrite = res.write
    res.write = function (data) {
      const body = JSON.parse(data)
      res.status(_.get(body, 'errors[0].httpStatus', 200))
      oldWrite.call(res, data)
    }
  }

  next()
}
