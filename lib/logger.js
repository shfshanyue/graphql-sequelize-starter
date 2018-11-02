const { format, transports, createLogger } = require('winston')

const myFormat = format.printf((info) => {
  const { label, message, ...data } = info
  return `\n${label}:\n${message}\n${data ? JSON.stringify(data, null, 2) : ''}`
})

const fmts = process.env.NODE_ENV === 'production' ? [format.json()] : [format.json(), myFormat]

const logger = createLogger({
  level: 'info',
  format: format.combine(...fmts),
  transports: [
    new transports.Console()
  ]
})

module.exports = logger
