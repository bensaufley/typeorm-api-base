import * as chai from 'chai';
import * as chaiPassportStrategy from 'chai-passport-strategy';
import DatabaseCleaner = require('database-cleaner'); // tslint:disable-line import-name
import { Client } from 'pg';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as chaiChange from 'chai-change';
import { Strategy, AuthenticateOptions } from 'passport';
import { Request } from 'koa';

process.env.NODE_ENV = 'test';

import ormconfig = require('../../ormconfig');
import User from '@src/entities/User';

Error.stackTraceLimit = Infinity;

class WrongError extends Error {
  message = 'Did not throw correct error';
}

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
chai.use(chaiChange);
chai.use(chaiPassportStrategy);

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

const passportStrategyReq = (
  strategy: Strategy,
  options?: AuthenticateOptions,
) => (
  reqFunc = (_: Request) => {},
) => new Promise<[User, object | undefined]>((resolve, reject) => {
  chai.passport
    .use(strategy)
    .success((user, info) => { resolve([user, info]); })
    .error((err: Error) => { reject(err); })
    .fail((challenge = 'no challenge', status) => {
      const message = typeof challenge === 'object' ? challenge.message : challenge;
      reject(new Error(`Authentication Failed: [${status}]: ${message}`));
    })
    .req(reqFunc)
    .authenticate(options);
});

const { expect } = chai;

export { clean, expect, passportStrategyReq, sinon, WrongError };
