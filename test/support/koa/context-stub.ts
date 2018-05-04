import * as Koa from 'koa';
import * as Stream from 'stream';

const contextStub = (req?: any, res?: any, app: Koa = new Koa()): Koa.Context => {
  const socket = new Stream.Duplex();
  const request = { socket, headers: {}, ...Stream.Readable.prototype, ...req };
  const response = { socket, _headers: {}, ...Stream.Writable.prototype, ...res };
  request.socket.remoteAddress = request.socket.remoteAddress || '127.0.0.1';
  response.getHeader = (k: string) => response._headers[k.toLowerCase()];
  response.setHeader = (k: string, v: any) => response._headers[k.toLowerCase()] = v;
  response.removeHeader = (k: string, _v: any) => delete response._headers[k.toLowerCase()];
  return app.createContext(request, response);
};

export default contextStub;

export const request = (req?: any, res?: any, app?: Koa) => contextStub(req, res, app).request;
export const response = (req?: any, res?: any, app?: Koa) => contextStub(req, res, app).response;
