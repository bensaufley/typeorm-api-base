import { createConnection } from 'typeorm';

import ormconfig = require('../../ormconfig');
import Logger from '@src/lib/Logger';

export const initialize = async () => {
  const connection = await createConnection(ormconfig);

  Logger.debug('Database connection established');

  return connection;
};
