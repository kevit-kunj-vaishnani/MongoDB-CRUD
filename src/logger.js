const { createLogger, transports, format } = require("winston");
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.File({
        filename : 'logger_data.log',
        level : "info",
        format : format.combine(format.timestamp(), format.json())
    }),

    new transports.MongoDB({
      level: 'info',
      db: 'mongodb://localhost:27017',
      collection: 'task-manager-api logs'
    })
  ],
});

module.exports = logger;
