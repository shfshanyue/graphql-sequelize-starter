const typeDef = `
  type Todo @sql(table: "todo") {
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
