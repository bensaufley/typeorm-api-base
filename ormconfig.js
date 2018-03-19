const { parse } = require('pg-connection-string');

const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';
const parsed = process.env.DATABASE_URL ? parse(process.env.DATABASE_URL) : {};

let connectionOptions = {
  host: parsed.host || 'localhost',
  port: parsed.port || 5432,
  username: parsed.user || 'root',
  password: parsed.password || '',
  database: parsed.database || `typeorm_api_${process.env.NODE_ENV}`,
};

module.exports = {
  ...connectionOptions,
  type: 'postgres',
  logging: isTest ? false : ['query', 'error'],
  entities: [
    isProd ? '.build/entities/**/*.js' : 'src/entities/**/*.ts'
  ],
  migrations: [
    isProd ? '.build/migrations/**/*.js' : 'src/migrations/**/*.ts',
  ],
  subscribers: [
    isProd ? '.build/subscribers/**/*.js' : 'src/subscribers/**/*.ts',
  ],
  cli: {
    entitiesDir: isProd ? '.build/entities' : 'src/entities',
    migrationsDir: isProd ? '.build/migrations' : 'src/migrations',
    subscribersDir: isProd ? '.build/subscribers' : 'src/subscribers',
  },
};
