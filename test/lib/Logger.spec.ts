// tslint:disable:max-line-length
import { expect, sinon } from '@test/support/spec-helper';

import Logger from '@src/lib/Logger';
import format from '@src/lib/format';

describe('Logger', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('output', () => {
    describe('error', () => {
      it('works', () => {
        const consoleErrorStub = sandbox.stub(console, 'error');
        Logger.error('test', 'second argument', 'third argument');
        consoleErrorStub.restore();

        expect(consoleErrorStub).to.have.been.calledWith(
          `\x1b[1m\x1b[31mERROR\x1b[0m\x1b[0m\x1b[90m\t[${new Date()}]\x1b[0m\x1b[1m\x1b[31m:\x1b[0m\x1b[0m`,
          'test',
          'second argument',
          'third argument',
        );
      });
    });

    describe('warn', () => {
      it('works', () => {
        const consoleLogStub = sandbox.stub(console, 'log');
        Logger.warn('test', 'second argument', 'third argument');
        consoleLogStub.restore();

        expect(consoleLogStub).to.have.been.calledWith(
          `\x1b[1m\x1b[33mWARN\x1b[0m\x1b[0m\x1b[90m\t[${new Date()}]\x1b[0m\x1b[1m\x1b[33m:\x1b[0m\x1b[0m`,
          'test',
          'second argument',
          'third argument',
        );
      });
    });

    describe('info', () => {
      it('works', () => {
        const debug = process.env.DEBUG;
        process.env.DEBUG = 'true';
        const consoleLogStub = sandbox.stub(console, 'log');
        Logger.info('test', 'second argument', 'third argument');
        consoleLogStub.restore();
        process.env.DEBUG = debug ? debug : '';

        expect(consoleLogStub).to.have.been.calledWith(
          `\x1b[1m\x1b[37mINFO\x1b[0m\x1b[0m\x1b[90m\t[${new Date()}]\x1b[0m\x1b[1m\x1b[37m:\x1b[0m\x1b[0m`,
          'test',
          'second argument',
          'third argument',
        );
      });

      it('doesn\'t call for test', () => {
        const consoleLogStub = sandbox.stub(console, 'log');
        Logger.info('test', 'second argument', 'third argument');
        consoleLogStub.restore();

        expect(consoleLogStub).not.to.have.been.called;
      });
    });

    describe('debug', () => {
      it('works', () => {
        const debug = process.env.DEBUG;
        process.env.DEBUG = 'true';
        const consoleLogStub = sandbox.stub(console, 'log');
        Logger.debug('test', 'second argument', 'third argument');
        consoleLogStub.restore();
        process.env.DEBUG = debug ? debug : '';

        expect(consoleLogStub).to.have.been.calledWith(
          `\x1b[1m\x1b[90mDEBUG\x1b[0m\x1b[0m\x1b[90m\t[${new Date()}]\x1b[0m\x1b[1m\x1b[90m:\x1b[0m\x1b[0m`,
          'test',
          'second argument',
          'third argument',
        );
      });

      it('doesn\'t call for production', () => {
        const nodeEnv = process.env.NODE_ENV;
        const consoleLogStub = sandbox.stub(console, 'log');
        process.env.NODE_ENV = 'production';
        Logger.debug('test', 'second argument', 'third argument');
        consoleLogStub.restore();
        process.env.NODE_ENV = nodeEnv ? nodeEnv : '';

        expect(consoleLogStub).not.to.have.been.called;
      });
    });

    describe('log', () => {
      it('works', () => {
        const consoleLogStub = sandbox.stub(console, 'log');
        Logger['log'](format.brightBlue, 'TEST', 'second argument', 'third argument');
        consoleLogStub.restore();

        expect(consoleLogStub).to.have.been.calledWith(
          `\x1b[1m\x1b[94mTEST\x1b[0m\x1b[0m\x1b[90m\t[${new Date()}]\x1b[0m\x1b[1m\x1b[94m:\x1b[0m\x1b[0m`,
          'second argument',
          'third argument',
        );
      });
    });
  });
});
