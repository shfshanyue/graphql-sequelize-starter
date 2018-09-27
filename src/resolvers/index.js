const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const typeDef = `
  type Query {
    ping: String!
    me: User @findOption
  }
`

const resolver = {
  Query: {
    ping: () => 'pong',
    me (root, args, { models, user }, { attributes }) {
      return models.users.findOne({
        where: {
          id: user.id
        },
        attributes
      })
    }
  }
}

const schemas = fs.readdirSync(path.resolve(__dirname)).filter(x => x[0].charCodeAt() < 96)
const { typeDefs, resolvers } = schemas.reduce(({ typeDefs, resolvers }, file) => {
  const { resolver, typeDef } = require(`./${file}`)
  return {
    typeDefs: [...typeDefs, typeDef],
    resolvers: _.merge(resolvers, resolver)
  }
}, {
  typeDefs: [typeDef],
  resolvers: resolver
})

module.exports = {
  typeDefs,
  resolvers
}
