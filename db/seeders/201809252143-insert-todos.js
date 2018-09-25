module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todo', [{
      name: '喝水',
      createTime: new Date()
    }, {
      name: '跑步',
      createTime: new Date()
    }, {
      name: '早起',
      createTime: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todo', null, {})
  }
}
