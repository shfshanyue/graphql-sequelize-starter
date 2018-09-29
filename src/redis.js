const Redis = require('ioredis')
const DataLoader = require('dataloader')
const config = require('../config')

const redis = new Redis({
  port: config.redis.port,
  host: config.redis.host,
  password: config.redis.password
})

const redisLoader = new DataLoader(keys => redis.mget(keys))

redis.get = (key) => redisLoader.load(key)

module.exports = redis
