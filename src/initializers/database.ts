import { createConnection } from 'typeorm';

import ormconfig = require('../../ormconfig');

export const initialize = async () => {
  const connection = await createConnection(ormconfig);

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'test') console.log('Database connection established');

  return connection;
};
