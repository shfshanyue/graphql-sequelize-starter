const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')
const _ = require('lodash')
const ms = require('ms')

class CacheDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (root, args, ctx, info) => {
      const age = this.args.age || 300
      const expire = _.isNumber(age) ? age : ms(age) / 1000
      const key = `${info.parentType.name}:${root.id || 0}:${info.fieldName}`
      const value = await ctx.redis.get(key)
      if (value) {
        return value
      }
      const newValue = await resolve.call(this, root, args, ctx, info)
      ctx.redis.set(key, newValue, 'EX', expire)
      return newValue
    }
  }
}

module.exports = CacheDirective
