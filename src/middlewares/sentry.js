module.exports = async function (resolve, parent, args, ctx, info) {
  try {
    const res = await resolve(parent, args, ctx, info)
    return res
  } catch (err) {
    // 如果是数据类型错误，如非空，则无法获取具体位置
    const id = `${info.parentType.name}:${parent.id || 0}:${info.fieldName}`
    ctx.Sentry.configureScope(scope => {
      scope.setExtra('GraphQLID', id)
    })
    throw err
  }
}
