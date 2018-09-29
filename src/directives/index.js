const SqlDirective = require('./sql')
const FindOptionDirective = require('./findOption')
const RelationDirective = require('./relation')
const AuthDirective = require('./auth')

module.exports = {
  sql: SqlDirective,
  findOption: FindOptionDirective,
  relation: RelationDirective,
  auth: AuthDirective
}
