const jwt = require('jsonwebtoken')
const { hash } = require('../utils')
const config = require('../../config')

const typeDef = `
  type User @sql(table: "users") {
    id: ID!
    name: String!
    createTime: DateTime!
  }

  type Mutation {
    # 登录，如果返回 null，则登录失败
    createUserToken (name: String!, password: String!): String
  }
`

const resolver = {
  User: {
  },
  Mutation: {
    async createUserToken (root, { name, password }, { models }) {
      const user = await models.users.findOne({
        where: {
          name,
          password: hash(password)
        },
        attributes: ['id'],
        raw: true
      })
      if (!user) {
        return
      }
      return jwt.sign(user, config.jwtSecret, { expiresIn: '1d' })
    }
  }
}

module.exports = {
  typeDef,
  resolver
}
