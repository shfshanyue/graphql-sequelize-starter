const Promise = require('bluebird')
const _ = require('lodash')
const consul = require('../src/consul')

const { project, dependencies: keys } = require('./consul.json')
const config = require('./config.json')

Promise.map([...keys, project], key => {
  const watch = consul.watch({ method: consul.kv.get, options: { key } })
  watch.on('change', async data => {
    const value = await consul.getValueByKey(key)
    _.assign(config, project === key ? value[project] : value)
  })
})

module.exports = config
