module.exports = (sequelize) => {
  const models = sequelize.models

  models.users.todos = models.users.hasMany(models.todo, { foreignKey: 'userId', as: 'todos' })
  models.todo.user = models.todo.belongsTo(models.users, { foreignKey: 'userId', as: 'user' })
}
