export class RequestError extends Error {
  name = 'RequestError';
  status: number;

  constructor(message: string = 'Bad Request', status: number = 500) {
    super(message);
    this.status = status;
  }
}
