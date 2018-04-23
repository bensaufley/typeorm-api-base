import { clean, expect, sinon } from '@test/support/spec-helper';

import { Connection } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import * as database from '@src/initializers/database';
import User from '@src/entities/User';
import { userSerializer, userDeserializer } from '@src/passport';

describe('passport', () => {
  let connection: Connection;
  let sandbox: sinon.SinonSandbox;
  let user: User;

  before(async () => {
    connection = await database.initialize();
    sandbox = sinon.sandbox.create();
  });

  beforeEach(async () => {
    user = await User.signUp(
      'myemail@email.com',
      'my-username',
      'its-my-password',
    );
  });

  afterEach(async () => {
    sandbox.restore();
    await clean();
  });

  after(async () => {
    await connection.close();
  });

  describe('userSerializer', () => {
    it('returns a user ID', () => {
      const done = sandbox.stub();
      userSerializer(user, done);

      expect(done).to.have.been.calledWith(null, user.id);
    });
  });

  describe('userDeserializer', () => {
    it('returns a user', async () => {
      const done = sandbox.stub();
      await userDeserializer(user.id, done);

      expect(done).to.have.been.calledWith(null, user);
    });

    it('returns false for no matching user', async () => {
      const done = sandbox.stub();
      await userDeserializer(uuidv4(), done);

      expect(done).to.have.been.calledWith(null, false);
    });

    it('returns an error', async () => {
      const done = sandbox.stub();
      const err = new Error('it borken');
      sandbox.stub(User, 'findOne').rejects(err);
      await userDeserializer(uuidv4(), done);

      expect(done).to.have.been.calledWith(err);
    });
  });
});
