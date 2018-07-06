import { expect } from '@test/support/spec-helper';

import format from '@src/lib/format';

describe('format', () => {
  it('does black', () => {
    expect(format.black('test')).to.eq('\x1b[30mtest\x1b[0m');
  });

  it('does red', () => {
    expect(format.red('test')).to.eq('\x1b[31mtest\x1b[0m');
  });

  it('does green', () => {
    expect(format.green('test')).to.eq('\x1b[32mtest\x1b[0m');
  });

  it('does yellow', () => {
    expect(format.yellow('test')).to.eq('\x1b[33mtest\x1b[0m');
  });

  it('does blue', () => {
    expect(format.blue('test')).to.eq('\x1b[34mtest\x1b[0m');
  });

  it('does magenta', () => {
    expect(format.magenta('test')).to.eq('\x1b[35mtest\x1b[0m');
  });

  it('does cyan', () => {
    expect(format.cyan('test')).to.eq('\x1b[36mtest\x1b[0m');
  });

  it('does white', () => {
    expect(format.white('test')).to.eq('\x1b[37mtest\x1b[0m');
  });

  it('does brightBlack', () => {
    expect(format.brightBlack('test')).to.eq('\x1b[90mtest\x1b[0m');
  });

  it('does brightRed', () => {
    expect(format.brightRed('test')).to.eq('\x1b[91mtest\x1b[0m');
  });

  it('does brightGreen', () => {
    expect(format.brightGreen('test')).to.eq('\x1b[92mtest\x1b[0m');
  });

  it('does brightYellow', () => {
    expect(format.brightYellow('test')).to.eq('\x1b[93mtest\x1b[0m');
  });

  it('does brightBlue', () => {
    expect(format.brightBlue('test')).to.eq('\x1b[94mtest\x1b[0m');
  });

  it('does brightMagenta', () => {
    expect(format.brightMagenta('test')).to.eq('\x1b[95mtest\x1b[0m');
  });

  it('does brightCyan', () => {
    expect(format.brightCyan('test')).to.eq('\x1b[96mtest\x1b[0m');
  });

  it('does brightWhite', () => {
    expect(format.brightWhite('test')).to.eq('\x1b[97mtest\x1b[0m');
  });

  it('does bold', () => {
    expect(format.bold('test')).to.eq('\x1b[1mtest\x1b[0m');
  });
});
