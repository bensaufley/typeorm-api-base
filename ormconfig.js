const { parse } = require('pg-connection-string');

const isTest = process.env.NODE_ENV === 'test';
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
    'src/entities/**/*.ts'
  ],
  migrations: [
    'src/migrations/**/*.ts',
  ],
  subscribers: [
    'src/subscribers/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};
