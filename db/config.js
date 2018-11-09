const { pg: db } = require('../config')
const logger = require('../lib/logger')

module.exports = {
  username: db.username,
  password: db.password,
  database: 'todos',
  host: db.host,
  port: db.port,
  dialect: 'postgres',
  logging (sql, { tableNames, type, model, ...rest }) {
    logger.info(sql, { label: 'SQL', tables: tableNames, type, model: model && model.name })
  }
}
