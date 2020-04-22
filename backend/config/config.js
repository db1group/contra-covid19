module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './src/db/databases/dev.sqlite',
  },
  qa: {
    host: 'drona.db.elephantsql.com',
    database: 'artamutj',
    username: 'artamutj',
    password: 'r3AAc-798qno4Ba8FT_9DtLqHJyLLQKh',
    dialect: 'postgres',
  },
  prod: {
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
  },
};
