const TIMEZONE_AMERICA_SAO_PAULO = 'America/Sao_Paulo';
if (!process.env.DATABASE_URL) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

module.exports = {
  development: {
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    timezone: TIMEZONE_AMERICA_SAO_PAULO,
  },
  test: {
    dialect: 'sqlite',
    storage: './src/db/databases/dev_test.sqlite',
    dialectOptions: {
      useUTC: true,
      dateStrings: true,
    },
  },
  qa: {
    host: 'localhost',
    database: 'covid2020',
    username: 'postgres',
    password: '123',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    timezone: TIMEZONE_AMERICA_SAO_PAULO,
  },
  prod: {
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    timezone: TIMEZONE_AMERICA_SAO_PAULO,
  },
};
