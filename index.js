const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    ping: String!
  }
`

const resolvers = {
  Query: {
    ping: () => 'pong'
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  port: process.env.PORT
})

server.start(() => console.log(`Server is running on localhost:${process.env.PORT || 4000}`))
