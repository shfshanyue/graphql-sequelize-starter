const utils = require('../../src/utils')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('users', [{
        name: 'shanyue',
        password: utils.hash('shanyue')
      }], {}),

      queryInterface.bulkInsert('users', [{
        name: 'shuifeng',
        password: utils.hash('shuifeng')
      }], {}),

      queryInterface.bulkInsert('users', [{
        name: 'admin',
        password: utils.hash('admin'),
        role: 'ADMIN'
      }], {}),

      queryInterface.bulkInsert('todo', [{
        name: '喝水',
        userId: 1
      }, {
        name: '跑步',
        userId: 1
      }, {
        name: '早起',
        userId: 2
      }], {})
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('todo', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ])
  }
}
