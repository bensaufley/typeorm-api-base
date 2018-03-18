import { expect } from '@test/support/spec-helper';

import { validate } from 'class-validator';
import { Connection } from 'typeorm';

import * as database from '@src/initializers/database';

import User from '@src/entities/User';

describe('User', () => {
  let connection: Connection;

  before(async () => {
    connection = await database.initialize();
  });

  after(async () => {
    await connection.close();
  });

  // This is essentially testing the behavior of external packages. I don't
  // know if I want to keep it around. But I figured it'd be good to have some
  // basic tests for the User model, and the code does specify the validators;
  // doesn't hurt to test that they work as expected.
  describe('validation', () => {
    describe('username', () => {
      it('rejects short username', async () => {
        const user = new User();
        user.username = 'blah';
        const errors = await validate(user);

        expect(errors).to.deep.include({
          target: user,
          property: 'username',
          value: 'blah',
          children: [],
          constraints: {
            length: 'username must be longer than or equal to 8 characters',
          },
        });
      });

      it('rejects long username', async () => {
        const user = new User();
        user.username = 'oueoiruaoerhoewaroiuewprweropiaeworkewrpiuerjewrpoiaewrewr';
        const errors = await validate(user);

        expect(errors).to.deep.include({
          target: user,
          property: 'username',
          value: 'oueoiruaoerhoewaroiuewprweropiaeworkewrpiuerjewrpoiaewrewr',
          children: [],
          constraints: {
            length: 'username must be shorter than or equal to 32 characters',
          },
        });
      });

      it('rejects invalid username', async () => {
        const user = new User();
        user.username = 'Mistah "Bombastic"';
        let errors = await validate(user);

        expect(errors).to.deep.include({
          target: user,
          property: 'username',
          value: 'Mistah "Bombastic"',
          children: [],
          constraints: {
            matches: 'username must begin with a letter, end with a letter or ' +
              'number, and consist of letters, numbers, dashes and periods',
          },
        });

        user.username = '99luftballoons';
        errors = await validate(user);

        expect(errors.find((e) => e.property === 'username')!.constraints).to.have.key('matches');

        user.username = 'mr...incredible';
        errors = await validate(user);

        expect(errors.find((e) => e.property === 'username')!.constraints).to.have.key('matches');
      });

      it('accepts valid usernames', async () => {
        const user = new User();
        user.username = 'mr.fantastic';
        let errors = await validate(user);

        expect(errors.map((e) => e.property)).not.to.include('username');

        user.username = 'bobparr1968';
        errors = await validate(user);

        expect(errors.map((e) => e.property)).not.to.include('username');
      });
    });
  });
});

