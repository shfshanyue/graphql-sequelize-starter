module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('ADMIN', 'USER'),
      allowNull: false,
      defaultValue: 'USER'
    }
    )
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'role')
  }
}
