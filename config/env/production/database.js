const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: config.host,
        port: config.port,
        database: config.database,
        username: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      options: {
        useNullAsDefault: true,
        pool: { 
          min: 2, 
          max: 15, 
          // I saw an issue here telling to set this property to false
          propagateCreateError: false, 
          idleTimeoutMillis: 30000, 
          createTimeoutMillis: 30000, 
          acquireTimeoutMillis: 30000
        }, 
      },
    },
  },
});
