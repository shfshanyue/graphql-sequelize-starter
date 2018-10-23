// 写入 config.json 以及 db.json 文件

const Promise = require('bluebird')
const _ = require('lodash')
const fs = require('fs')

const consul = require('../src/consul')
const { project, dependencies: keys } = require('../config/consul')

const CONFIG_FILE_PATH = `${__dirname}/../config/config.json`
const CONFIG_DB_PATH = `${__dirname}/../config/db.json`

Promise.map([...keys, project], key => {
  return consul.getValueByKey(key).then(config => key === project ? config[project] : config)
}).then((configs) => {
  const config = _.assign(...configs)
  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf8')
  fs.writeFileSync(CONFIG_DB_PATH, JSON.stringify(config.pg, null, 2), 'utf8')
})
