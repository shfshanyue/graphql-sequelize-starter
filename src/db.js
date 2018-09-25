const Sequelize = require('sequelize')
const fs = require('fs')

const { db } = require('../config')

const sequelize = new Sequelize(db.database, db.username, db.password, {
  dialect: 'postgres',
  host: db.host,
  port: db.port
})

// import all schemas
fs.readdirSync(`${__dirname}/../db/_schemas`).forEach((file) => {
  sequelize.import(`${__dirname}/../db/_schemas/${file}`)
})

module.exports = sequelize
