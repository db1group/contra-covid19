module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './src/db/databases/dev.sqlite',
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
    },
  },
  qa: {
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
    },
    timezone: '00:00',
  },
  prod: {
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
    },
    timezone: '00:00',
  },
};
