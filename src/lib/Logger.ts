import format from '@src/lib/format';

export default class Logger {
  public static error(...args: any[]) {
    this.log(format.red, 'ERROR', ...args);
  }

  public static warn(...args: any[]) {
    this.log(format.yellow, 'WARN', ...args);
  }

  public static info(...args: any[]) {
    if (process.env.NODE_ENV === 'test' && !process.env.DEBUG) return;
    this.log(format.white, 'INFO', ...args);
  }

  public static debug(...args: any[]) {
    if (process.env.NODE_ENV !== 'development' && !process.env.DEBUG) return;
    this.log(format.brightBlack, 'DEBUG', ...args);
  }

  private static log(
    color: (text: string) => string,
    text: string,
    ...args: any[]
  ) {
    console[text === 'ERROR' ? 'error' : 'log'](
      [
        format.bold(color(text)),
        format.brightBlack(`\t[${new Date()}]`),
        format.bold(color(':')),
      ].join(''),
      ...args,
    );
  }
}
