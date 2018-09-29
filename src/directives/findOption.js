const { SchemaDirectiveVisitor } = require('graphql-tools')
const { getAttrs, parsePage } = require('../utils')

class FindOptionDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field

    field.resolve = async (root, args, context, info) => {
      const attributes = getAttrs(info, context.models)
      const { page, pageSize } = args
      const { limit, offset } = parsePage(page, pageSize)
      return resolve.call(this, root, args, context, {
        ...info,
        attributes,
        limit,
        offset
      })
    }
  }
}

module.exports = FindOptionDirective
