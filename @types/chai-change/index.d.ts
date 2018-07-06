/// <reference types="chai" />

declare module 'chai-change' {
  interface ChaiChangeOptions {
    by?: number;
    from?: number;
    to?: number;
  }

  declare global {
    export namespace Chai {
      interface Assertion {
        alter(cb: () => any, opts: ChaiChangeOptions): Assertion;
      }
    }
  }

  declare function chaiChange(chai: any, utils: any): void;
  declare namespace chaiChange { }
  export = chaiChange;
}
