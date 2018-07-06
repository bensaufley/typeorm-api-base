// tslint:disable:max-line-length
import { expect, sinon } from '@test/support/spec-helper';

import Logger from '@src/lib/Logger';

describe('Logger', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('colors', () => {
    it('does black', () => { expect(Logger.black('test')).to.eq('\x1b[30mtest\x1b[0m'); });
    it('does red', () => { expect(Logger.red('test')).to.eq('\x1b[31mtest\x1b[0m'); });
    it('does green', () => { expect(Logger.green('test')).to.eq('\x1b[32mtest\x1b[0m'); });
    it('does yellow', () => { expect(Logger.yellow('test')).to.eq('\x1b[33mtest\x1b[0m'); });
    it('does blue', () => { expect(Logger.blue('test')).to.eq('\x1b[34mtest\x1b[0m'); });
    it('does magenta', () => { expect(Logger.magenta('test')).to.eq('\x1b[35mtest\x1b[0m'); });
    it('does cyan', () => { expect(Logger.cyan('test')).to.eq('\x1b[36mtest\x1b[0m'); });
    it('does white', () => { expect(Logger.white('test')).to.eq('\x1b[37mtest\x1b[0m'); });
    it('does brightBlack', () => { expect(Logger.brightBlack('test')).to.eq('\x1b[90mtest\x1b[0m'); });
    it('does brightRed', () => { expect(Logger.brightRed('test')).to.eq('\x1b[91mtest\x1b[0m'); });
    it('does brightGreen', () => { expect(Logger.brightGreen('test')).to.eq('\x1b[92mtest\x1b[0m'); });
    it('does brightYellow', () => { expect(Logger.brightYellow('test')).to.eq('\x1b[93mtest\x1b[0m'); });
    it('does brightBlue', () => { expect(Logger.brightBlue('test')).to.eq('\x1b[94mtest\x1b[0m'); });
    it('does brightMagenta', () => { expect(Logger.brightMagenta('test')).to.eq('\x1b[95mtest\x1b[0m'); });
    it('does brightCyan', () => { expect(Logger.brightCyan('test')).to.eq('\x1b[96mtest\x1b[0m'); });
    it('does brightWhite', () => { expect(Logger.brightWhite('test')).to.eq('\x1b[97mtest\x1b[0m'); });

    it('does bold', () => { expect(Logger.bold('test')).to.eq('\x1b[1mtest\x1b[0m'); });

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
        Logger['log'](Logger.brightBlue, 'TEST', 'second argument', 'third argument');
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
