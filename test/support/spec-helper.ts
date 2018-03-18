import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

Error.stackTraceLimit = Infinity;

process.env.NODE_ENV = 'test';

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

const { expect } = chai;

export { expect, sinon };
