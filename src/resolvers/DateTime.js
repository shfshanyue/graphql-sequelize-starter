const { GraphQLDateTime } = require('graphql-iso-date')

const typeDef = `
  scalar DateTime
`

const resolver = {
  DateTime: GraphQLDateTime
}

module.exports = {
  typeDef,
  resolver
}
