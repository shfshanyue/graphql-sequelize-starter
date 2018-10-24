// 写入 config.json 以及 db.json 文件

const Promise = require('bluebird')
const _ = require('lodash')
const fs = require('fs')

const consul = require('../src/consul')
const { project, dependencies: keys } = require('../config/consul')
const projectConfig = require('../config/project')

const CONFIG_FILE_PATH = `${__dirname}/../config/config.json`

const config = {}

Promise.map([...keys, project], key => {
  return consul.getValueByKey(key).then(config => key === project ? _.assign(projectConfig, config[project]) : config)
}).then((configs) => {
  const cfg = _.assign(config, ...configs)
  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(cfg, null, 2), 'utf8')
})

// Promise.map([...keys, project], key => {
//   const watch = consul.watch({ method: consul.kv.get, options: { key } })
//   watch.on('change', async data => {
//     const value = await consul.getValueByKey(key)
//     _.assign(config, project === key ? value[project] : value)
//     fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf8')
//   })
// })
