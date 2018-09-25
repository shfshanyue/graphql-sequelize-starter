const GraphQLJSON = require('graphql-type-json')

const typeDef = `
  scalar JSON
`

const resolver = {
  JSON: GraphQLJSON
}

module.exports = {
  typeDef,
  resolver
}
