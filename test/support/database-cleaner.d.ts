declare module 'database-cleaner' {
  import { Client, PoolClient } from 'pg';

  class DatabaseCleaner {
    constructor(type: string);
    clean(database: PoolClient | Client, callback: () => void): void;
  }

  export = DatabaseCleaner;
}
