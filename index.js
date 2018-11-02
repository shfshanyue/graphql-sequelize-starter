const { GraphQLServer } = require('graphql-yoga')
const _ = require('lodash')
const Sentry = require('@sentry/node')

const { typeDefs, resolvers } = require('./src/resolvers')
const directives = require('./src/directives')
const middlewares = require('./src/middlewares')
const { models } = require('./db')
const config = require('./config')
const Exception = require('./src/error')
const redis = require('./src/redis')
const auth = require('./src/auth')
const logger = require('./lib/logger')

const httpStatus = require('./middlewares/httpStatus')

const isProduction = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: config.sentryDSN,
  debug: !isProduction,
  environment: process.env.NODE_ENV || 'development'
})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  schemaDirectives: directives,
  middlewares,
  context (req) {
    const token = _.get(req, 'request.headers.authorization', '').replace('Bearer ', '')
    const user = auth.verify(token)
    const { body, headers, originalUrl, method, connection } = req.request
    logger.info(`${_.get(body, 'operationName')}`, { label: 'Request', request: body })
    Sentry.configureScope((scope) => {
      scope.addEventProcessor(async event => {
        event.request = {
          method,
          headers,
          data: body,
          url: `http://${headers.host}${originalUrl}`
        }
        event.user = {
          ...event.user,
          ip_address: _.get(connection, 'remoteAddress')
        }
        return event
      })
    })
    return {
      models,
      redis,
      user,
      Exception,
      Sentry
    }
  }
})

server.express.use(httpStatus)

server.start({
  port: process.env.PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  rootValue: {},
  formatError (e) {
    const originalError = e.originalError
    const httpStatus = _.get(originalError, 'httpStatus', 400)
    if (httpStatus !== 401 && httpStatus !== 403) {
      Sentry.configureScope(scope => {
        scope.setExtra('GraphQLError', { ...e })
        Sentry.captureException(e.originalError)
      })
    }
    return {
      ...e,
      httpStatus
    }
  },
  formatResponse (res) {
    return res
  }
}, ({ port }) => console.log(`Server is running on localhost:${port}`))
