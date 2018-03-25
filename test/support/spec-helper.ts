import * as chai from 'chai';
import DatabaseCleaner = require('database-cleaner'); // tslint:disable-line import-name
import { Client } from 'pg';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

process.env.NODE_ENV = 'test';

import ormconfig = require('../../ormconfig');

Error.stackTraceLimit = Infinity;

let unhandledRejectionExitCode = 0;
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise rejection:', reason);
  unhandledRejectionExitCode = 1;
  throw promise;
});
process.prependListener('exit', (code) => {
  if (code === 0) process.exit(unhandledRejectionExitCode);
});

chai.use(sinonChai);

const dbCleaner = new DatabaseCleaner('postgresql');
const dbUrl = `postgres://${ormconfig.username}:${ormconfig.password}@` +
  `${ormconfig.host}:${ormconfig.port}/${ormconfig.database}`;

const clean = async () => {
  const client = new Client(dbUrl);
  await client.connect();
  await new Promise((resolve) => {
    dbCleaner.clean(client, () => {
      client.end();
      resolve();
    });
  });
};

const { expect } = chai;

export { clean, expect, sinon };
