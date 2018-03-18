import { parse } from 'pg-connection-string';
import { createConnection } from 'typeorm';

import User from '@src/entities/User';

const isTest = process.env.NODE_ENV === 'test';

let connectionOptions = {
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '',
  database: `typeorm_api_${process.env.NODE_ENV}`,
};

if (process.env.DATABASE_URL) {
  const parsed: any = parse(process.env.DATABASE_URL);

  [['host'], ['port'], ['user', 'username'], ['password'], ['database']].forEach(([n, k]) => {
    const val = parsed[n];
    if (val as any !== null) {
      connectionOptions = { ...connectionOptions, [k || n]: val };
    }
  });
}

export const initialize = async () => {
  const connection = await createConnection({
    ...connectionOptions,
    type: 'postgres',
    logging:
      /* istanbul ignore next */
      isTest ? false : ['query', 'error'],
    synchronize: true,
    entities: [
      User,
    ],
    migrations: [
      'server/migration/**/*.ts',
    ],
    cli: {
      entitiesDir: 'server/entity',
      migrationsDir: 'server/migration',
      subscribersDir: 'server/subscriber',
    },
  });

  /* istanbul ignore if */
  if (!isTest) console.log('Database connection established');

  return connection;
};
