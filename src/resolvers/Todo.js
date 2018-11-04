const typeDef = `
  enum TodoStatus {
    DONE 
    UNDO
  }

  type Todo @sql(table: "todo") {
    id: ID!
    name: String! @constraint(minLength: 2)
    createTime: DateTime!
    user: User! @relation
    status: TodoStatus!
  }

  input TodoCreate {
    name: String! @constraint(minLength: 2)
  }

  input TodoUpdate {
    id: ID!
    name: String @constraint(minLength: 2)
    status: TodoStatus
  }

  extend type Mutation {
    createTodo (todo: TodoCreate!): Todo @auth
    updateTodo (todo: TodoUpdate!): Boolean @auth
  }
`

const resolver = {
  Todo: {
  },
  Mutation: {
    createTodo (root, { todo }, { models, user }) {
      return models.todo.create({
        ...todo,
        userId: user.id
      })
    },
    updateTodo (root, { todo }, { models }) {
      return models.todo.update(todo, {
        where: {
          id: todo.id
        }
      }).then(res => res[0])
    }
  }
}

module.exports = {
  typeDef,
  resolver
}
