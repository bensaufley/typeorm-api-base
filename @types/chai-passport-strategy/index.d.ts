/// <reference types="chai" />

declare module 'chai-passport-strategy' {
  import { Request } from 'koa';
  import { Strategy, AuthenticateOptions, StrategyCreatedStatic } from 'passport';

  interface ChaiPassportTest {
    success: (cb: (user: any, info?: object) => void) => ChaiPassportTest;
    fail: (
      cb: (challenge?: { message: string } | string | number, status?: number) => void,
    ) => ChaiPassportTest;
    redirect: (cb: (url: string, status?: number) => void) => ChaiPassportTest;
    pass: (cb: () => void) => ChaiPassportTest;
    error: (cb: (err: Error) => void) => ChaiPassportTest;
    req: (cb: (req: Request) => void) => ChaiPassportTest;
    authenticate: (options?: AuthenticateOptions) => void;
  }

  interface ChaiPassport {
    use: (strategy: Strategy) => ChaiPassportTest;
  }

  declare global {
    export namespace Chai {
      interface ChaiStatic {
        passport: ChaiPassport;
      }
    }
  }

  declare function chaiPassportStrategy(chai: any, utils: any): void;
  declare namespace chaiPassportStrategy { }
  export = chaiPassportStrategy;
}
