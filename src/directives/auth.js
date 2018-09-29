const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')
const _ = require('lodash')

// 复杂的认证可以使用 graphql-shield 搞定
// https://github.com/maticzav/graphql-shield

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    const { role = 'USER' } = this.args
    field.resolve = async (root, args, ctx, info) => {
      if (_.get(ctx, 'user.role') !== role) {
        throw new ctx.Exception('INVALID_TOKEN')
      }
      return resolve.call(this, root, args, ctx, info)
    }
  }
}

module.exports = AuthDirective
