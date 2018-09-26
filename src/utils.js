const _ = require('lodash')
const { simplifyAST } = require('graphql-sequelize')

/**
 * 分页, 不传参数为获取全部，对于负值进行容错处理
 *
 * @returns {Number} limit
 * @returns {Number} offset
 */
function parsePage (page, pageSize) {
  if (pageSize < 1 || !pageSize) {
    pageSize = page > 0 ? 10 : undefined
  }
  if (page < 1 || !page) {
    page = 1
  }
  return {
    limit: pageSize,
    offset: pageSize ? (page - 1) * pageSize : undefined
  }
}

/**
 * getType 获取该 field 需要返回的类型
 *
 * @param type
 * @returns {undefined}
 */
function getType (type) {
  while (type.ofType) {
    type = type.ofType
  }
  return type
}

/**
 * getAttrs 如果需要返回的是 type，则根据该 type 所需的 fields 返回数据库所需的字段
 *
 * @param info
 * @param models
 * @param field
 * @returns {undefined}
 */
function getAttrs (info, models, field) {
  let type = getType(info.returnType)

  if (field) {
    type = getType(_.get(type._fields[field], 'type', {}))
  }

  if (type.constructor.name !== 'GraphQLObjectType' && type.constructor.name !== 'GraphQLInterfaceType') {
    return []
  }

  if (!type.table) {
    console.warn(`type ${type.name} require link database table, but not provided`)
    return undefined
  }
  const fieldNodes = info.fieldASTs || info.fieldNodes
  let { fields: fieldsMap } = simplifyAST(fieldNodes[0])

  if (field) {
    fieldsMap = _.get(fieldsMap[field], 'fields', {})
  }

  // fields: ['id', 'name']
  // graphl 所需要的字段
  const model = models[type.table]

  // 所有的主键都需要命名为 id
  const primaryKey = model.primaryKeyField ? ['id'] : []

  // 去除 __typename 能 introduction 类型的干扰
  const fields = _.uniq(_.concat(primaryKey, _.keys(fieldsMap).filter(x => !x.startsWith('__'))))

  // allFields
  // graphql type 的全部字段
  const allFields = type._fields
  const attrs = fields.reduce((acc, x) => {
    const { col, dep } = _.get(allFields, x, {})
    if (!col && !dep) {
      const modelAttributes = model.attributes
      if (modelAttributes[x]) {
        return [...acc, x]
      }
      return acc
    }
    return dep ? [...acc, ...dep] : [...acc, [col, x]]
  }, [])
  return _.uniq(attrs)
}

module.exports = {
  getAttrs,
  parsePage
}
