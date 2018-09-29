const { SchemaDirectiveVisitor } = require('graphql-tools')
const _ = require('lodash')

const { getAttrs, parsePage } = require('../utils')

class RelationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { as = field.name } = this.args

    field.resolve = async (root, args, context, info) => {
      if (_.get(root, as)) {
        return _.get(root, as)
      }
      const { sequelize, tableName } = root._modelOptions
      // 在一对多的时候会用到外键 hasMany
      let foreignKey = []

      const sourceModel = sequelize.models[tableName]
      const association = sourceModel.associations[as]
      // 如果是 1:m 需要1的外键
      if (association.associationType === 'HasMany') {
        // foreignKey 代表 as 后的 name
        // foreignKeyField 代表数据库的 name
        foreignKey = association.foreignKey || association.foreignKeyField
      }
      // 如果是 m:1 需要m的建联系的键，有可能不是主键
      if (sourceModel.associations[as].associationType === 'BelongsTo') {
        // 必须是 targetKey 而不是 targetKeyField
        foreignKey = association.targetKey || association.targetKeyField
      }

      // 添加外键，方便 dataloader
      const attributes = _.uniq(_.concat(getAttrs(info, context.models), foreignKey))
      if (_.isEmpty(args)) {
        return root.get(as) || _.get(root, `get${_.upperFirst(as)}`).bind(root)({
          // attributes 自动注入
          attributes
        })
      }

      const { page, pageSize } = args
      const { limit, offset } = parsePage(page, pageSize)
      return _.get(root, `get${_.upperFirst(as)}`).bind(root)({
        attributes,
        limit,
        offset
      })
    }
  }
}

module.exports = RelationDirective
