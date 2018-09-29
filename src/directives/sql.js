const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')
const _ = require('lodash')

class SqlDirective extends SchemaDirectiveVisitor {
  visitObject (object) {
    object.table = this.args.table
  }

  visitInterface (iface) {
    iface.table = this.args.table
  }

  visitFieldDefinition (field) {
    // col 与 dep 不能同时存在
    // 如果有 dep 并且返回为type，则把 attrbutes 注入到 info 中
    const { col, dep } = this.args
    const { resolve = defaultFieldResolver, name } = field

    field.dep = dep && _.concat(dep)
    field.col = col || name

    field.resolve = async (root, ...args) => {
      if (col) {
        return root.get(name)
      }
      return resolve.call(this, root, ...args)
    }
  }
}

module.exports = SqlDirective
