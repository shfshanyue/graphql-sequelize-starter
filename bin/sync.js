const SequelizeAuto = require('sequelize-auto')
const rimraf = require('rimraf')
const { db } = require('../config')

const SCHEMA_PATH = `${__dirname}/../db/_schemas`

rimraf(SCHEMA_PATH, () => {
  console.log('delete schema path DONE!')
})

const auto = new SequelizeAuto(db.database, db.username, db.password, {
  dialect: 'postgres',
  host: db.host,
  port: db.port,
  additional: {
    timestamps: false
  },
  spaces: true,
  indentation: 2,
  directory: SCHEMA_PATH
})

auto.run((err) => {
  if (err) {
    throw err
  }
  console.log('sync database DONE!')
  process.exit(0)
})
