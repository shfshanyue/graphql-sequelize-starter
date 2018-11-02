const _ = require('lodash')

const consul = require('consul')({
  promisify: true,
  host: 'xiange.me',
  port: 8500
})

consul.getValueByKey = key => {
  return consul.kv.get({
    key,
    recurse: true
  }).then(values => {
    return values.reduce((acc, value) => {
      const { Key: k, Value: v } = value
      if (!_.endsWith(k, '/')) {
        _.set(acc, k.replace(/\//g, '.'), v)
      }
      return acc
    }, {})
  })
}

module.exports = consul
