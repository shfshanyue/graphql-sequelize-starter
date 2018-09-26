const utils = require('../../src/utils')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('users', [{
        name: '山月',
        password: utils.hash('shanyue')
      }], {}),

      queryInterface.bulkInsert('todo', [{
        name: '喝水',
        userId: 1
      }, {
        name: '跑步',
        userId: 1
      }, {
        name: '早起',
        userId: 1
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
