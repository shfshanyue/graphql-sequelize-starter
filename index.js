const { GraphQLServer } = require('graphql-yoga')
const { typeDefs, resolvers } = require('./src/resolvers')

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start({
  port: process.env.PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}, ({ port }) => console.log(`Server is running on localhost:${port}`))
