const typeDef = `
  type User @sql(table: "users") {
    id: ID!
    name: String!
    createTime: DateTime!
  }
`

const resolver = {
  User: {
  }
}

module.exports = {
  typeDef,
  resolver
}
