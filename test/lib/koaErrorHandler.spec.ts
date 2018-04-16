import { expect, sinon } from '@test/support/spec-helper';

import { ValidationError } from 'class-validator';

import koaErrorHandler, { validationErrorReducer } from '@src/lib/koaErrorHandler';

describe('koaErrorHandler', () => {
  describe('validationErrorReducer', () => {
    it('returns an array of strings describing errors', () => {
      const messages: { [key: string]: string }[] = [
        { key: 'this is an error' },
        { key: 'here\'s another error', second_key: 'and another' },
        { key: 'here\'s a third error', other_key: 'another other message' },
      ];
      const errors: ValidationError[] = messages.map((m) => {
        const err = new ValidationError();
        err.constraints = m;
        return err;
      });

      expect(validationErrorReducer(errors)).to.eql([
        'this is an error',
        'here\'s another error', 'and another',
        'here\'s a third error', 'another other message',
      ]);
    });

    it('returns an empty array if the error has no violations attached', () => {
      expect(validationErrorReducer()).to.eql([]);
    });
  });

  describe('koaErrorHandler', () => {
    let ctx: any;

    beforeEach(() => {
      ctx = {
        app: { emit: sinon.stub() },
        body: null,
        request: {
          method: null,
          rawBody: null,
          url: null,
        },
        response: {},
        status: null,
      };
    });

    it('doesn\'t do anything if next doesn\'t throw', async () => {
      const next = sinon.stub().resolves();

      await koaErrorHandler(ctx, next);

      expect(next).to.have.been.called;
      expect(ctx.app.emit).not.to.have.been.called;
      expect(ctx.status).to.be.null;
      expect(ctx.body).to.be.null;
    });

    it('defaults to 500', async () => {
      const err: any = new Error('Borkened');
      const next = sinon.stub().rejects(err);

      await koaErrorHandler(ctx, next);
      expect(ctx.status).to.eq(500);
    });

    it('sets the status and body and emits the error when error', async () => {
      const err: any = new Error('Oh no it bork');
      err.status = 502;
      const violation = new ValidationError();
      violation.constraints = { thing: 'can\'t do that' };
      err.violations = [violation];
      const next = sinon.stub().rejects(err);

      await koaErrorHandler(ctx, next);

      expect(next).to.have.been.called;
      expect(ctx.app.emit).to.have.been.calledWith('error', err, ctx);
      expect(ctx.status).to.eq(502);
      expect(ctx.body).to.eql({
        error: 'Error',
        message: 'Oh no it bork',
        details: ['can\'t do that'],
      });
    });
  });
});
