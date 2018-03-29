export default class Logger {
  static black = (text: string) => `\x1b[30m${text}\x1b[0m`;
  static red = (text: string) => `\x1b[31m${text}\x1b[0m`;
  static green = (text: string) => `\x1b[32m${text}\x1b[0m`;
  static yellow = (text: string) => `\x1b[33m${text}\x1b[0m`;
  static blue = (text: string) => `\x1b[34m${text}\x1b[0m`;
  static magenta = (text: string) => `\x1b[35m${text}\x1b[0m`;
  static cyan = (text: string) => `\x1b[36m${text}\x1b[0m`;
  static white = (text: string) => `\x1b[37m${text}\x1b[0m`;
  static brightBlack = (text: string) => `\x1b[90m${text}\x1b[0m`;
  static brightRed = (text: string) => `\x1b[91m${text}\x1b[0m`;
  static brightGreen = (text: string) => `\x1b[92m${text}\x1b[0m`;
  static brightYellow = (text: string) => `\x1b[93m${text}\x1b[0m`;
  static brightBlue = (text: string) => `\x1b[94m${text}\x1b[0m`;
  static brightMagenta = (text: string) => `\x1b[95m${text}\x1b[0m`;
  static brightCyan = (text: string) => `\x1b[96m${text}\x1b[0m`;
  static brightWhite = (text: string) => `\x1b[97m${text}\x1b[0m`;

  static bold = (text:string) => `\x1b[1m${text}\x1b[0m`;
  public static error(...args: any[]) {
    this.log(this.red, 'ERROR', ...args);
  }

  public static warn(...args: any[]) {
    this.log(this.yellow, 'WARN', ...args);
  }

  public static info(...args: any[]) {
    if (process.env.NODE_ENV === 'test' && !process.env.DEBUG) return;
    this.log(this.white, 'INFO', ...args);
  }

  public static debug(...args: any[]) {
    if (process.env.NODE_ENV !== 'development' && !process.env.DEBUG) return;
    this.log(this.brightBlack, 'DEBUG', ...args);
  }

  private static log(
    color: (text: string) => string,
    text: string,
    ...args: any[],
  ) {
    console[text === 'ERROR' ? 'error' : 'log'](
      [
        this.bold(color(text)),
        this.brightBlack(`\t[${new Date()}]`),
        this.bold(color(':')),
      ].join(''),
      ...args,
    );
  }
}
