const { GraphQLServer } = require('graphql-yoga')
const { typeDefs, resolvers } = require('./src/resolvers')
const directives = require('./src/directives')
const { models } = require('./src/db')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  schemaDirectives: directives,
  context () {
    return {
      models
    }
  }
})

server.start({
  port: process.env.PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}, ({ port }) => console.log(`Server is running on localhost:${port}`))
