const { pg: db } = require('../config')

module.exports = {
  username: db.username,
  password: db.password,
  database: 'todos',
  host: db.host,
  port: db.port,
  dialect: 'postgres',
  logging (sql) {
    console.log(sql)
  }
}
