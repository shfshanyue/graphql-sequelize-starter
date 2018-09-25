const typeDef = `
  type Todo {
    id: ID!
    name: String!
    createTime: DateTime!
  }
`

const resolver = {
  Todo: {
  }
}

module.exports = {
  typeDef,
  resolver
}
