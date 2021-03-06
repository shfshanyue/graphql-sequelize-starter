const Sequelize = require('sequelize')
const fs = require('fs')
const { createContext } = require('dataloader-sequelize')
const association = require('./association')

const config = require('./config')

const sequelize = new Sequelize(config)

// import all schemas
fs.readdirSync(`${__dirname}/_schemas`).forEach((file) => {
  sequelize.import(`${__dirname}/_schemas/${file}`)
})

association(sequelize)
createContext(sequelize, {
  cache: true
})

module.exports = sequelize
