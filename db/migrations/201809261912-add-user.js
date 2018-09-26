module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      email: {
        type: Sequelize.STRING
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
