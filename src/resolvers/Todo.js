const typeDef = `
  type Todo {
    id: ID!
    name: String!
  }
`

const resolver = {
  Todo: {
    name () {
      return 'todo'
    }
  }
}

module.exports = {
  typeDef,
  resolver
}
