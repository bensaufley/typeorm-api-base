export default {
  black: (text: string) => `\x1b[30m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
  white: (text: string) => `\x1b[37m${text}\x1b[0m`,
  brightBlack: (text: string) => `\x1b[90m${text}\x1b[0m`,
  brightRed: (text: string) => `\x1b[91m${text}\x1b[0m`,
  brightGreen: (text: string) => `\x1b[92m${text}\x1b[0m`,
  brightYellow: (text: string) => `\x1b[93m${text}\x1b[0m`,
  brightBlue: (text: string) => `\x1b[94m${text}\x1b[0m`,
  brightMagenta: (text: string) => `\x1b[95m${text}\x1b[0m`,
  brightCyan: (text: string) => `\x1b[96m${text}\x1b[0m`,
  brightWhite: (text: string) => `\x1b[97m${text}\x1b[0m`,
  bold: (text:string) => `\x1b[1m${text}\x1b[0m`,
};
