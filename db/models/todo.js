module.exports = function (sequelize) {
  const Todo = sequelize.models.todo

  console.log(Todo.options.validate)
  Todo.options.validate = {
    naame () {
      console.log(this.name, 'asdfasdf')
      if (this.name !== 'asdfasd') {
        console.log('hello, world')
      }
    }
  }
}
