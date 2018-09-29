const { GraphQLServer } = require('graphql-yoga')
const _ = require('lodash')

const { typeDefs, resolvers } = require('./src/resolvers')
const directives = require('./src/directives')
const { models } = require('./db')
const Exception = require('./src/error')
const redis = require('./src/redis')
const auth = require('./src/auth')

const httpStatus = require('./middlewares/httpStatus')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  schemaDirectives: directives,
  context (req) {
    const token = _.get(req, 'request.headers.authorization', '').replace('Bearer ', '')
    const user = auth.verify(token)
    return {
      models,
      redis,
      user,
      Exception
    }
  }
})

server.express.use(httpStatus)

server.start({
  port: process.env.PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  formatError (e) {
    const httpStatus = _.get(e, 'originalError.httpStatus', 400)
    return {
      ...e,
      httpStatus
    }
  },
  formatResponse (res) {
    return res
  }
}, ({ port }) => console.log(`Server is running on localhost:${port}`))

process.on('unhandledRejection', error => {
  console.error(error)
})
