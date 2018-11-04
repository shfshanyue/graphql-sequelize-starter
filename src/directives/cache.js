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
      const id = root.id ? `${root.id}:` : ''
      // key: User:10086:age({cache: 3})
      const key = `${info.parentType.name}:${id}${field.name}(${JSON.stringify(args)})`
      const value = await ctx.redis.get(key)
      if (value) {
        return JSON.parse(value)
      }
      const newValue = await resolve.call(this, root, args, ctx, info)
      ctx.redis.set(key, JSON.stringify(newValue), 'EX', expire)
      return newValue
    }
  }
}

module.exports = CacheDirective
