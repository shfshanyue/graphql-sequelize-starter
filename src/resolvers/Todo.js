const typeDef = `
  type Todo @sql(table: "todo") {
    id: ID!
    name: String!
    createTime: DateTime!
    user: User!
  }

  input TodoCreate {
    name: String!
  }

  input TodoUpdate {
    id: ID!
    name: String!
  }

  extend type Mutation {
    createTodo (todo: TodoCreate!): Todo
    updateTodo (todo: TodoUpdate!): Boolean
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
      })
    }
  }
}

module.exports = {
  typeDef,
  resolver
}
