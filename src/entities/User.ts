import {
  IsDefined,
  IsEmail,
  Length,
  Matches,
  validateOrReject,
  ValidatorOptions,
  ValidateIf,
} from 'class-validator';
import {
  createHash,
  randomBytes,
} from 'crypto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import IsUnique from '../lib/IsUnique'; // Must be relative because of TypeORM CLI

const asyncRandomBytes = (size: number, encoding: string): Promise<string> => (
  new Promise((resolve, reject) => {
    randomBytes(size, (err, buff) => {
      if (err) return reject(err);
      resolve(buff.toString(encoding));
    });
  })
);

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index({ unique: true })
  @Column('varchar', { length: 32 })
  @IsUnique(User)
  @Length(8, 32)
  @IsDefined()
  @Matches(/^[a-z](?!.*[.-]{2,})[a-z0-9.-]+[a-z0-9]$/i, {
    message: 'username must begin with a letter, end with a letter or ' +
      'number, and consist of letters, numbers, dashes and periods',
  })
  username: string;

  @Index({ unique: true })
  @Column('varchar')
  @IsUnique(User)
  @IsEmail()
  @IsDefined()
  email: string;

  @Column('varchar', { select: false })
  passwordDigest: string;

  @Column('varchar', { select: false })
  passwordSalt: string;

  @ValidateIf((o, v) => !o.id || v !== undefined)
  @Length(12, 64)
  @IsDefined()
  password: string;

  public static async signUp(email: string, username: string, password: string) {
    const user = User.create({
      email,
      username,
    });
    user.password = password;
    await user.save();
    return user;
  }

  @BeforeInsert()
  async digestPassword() {
    this.passwordSalt = await asyncRandomBytes(32, 'hex');
    this.passwordDigest = createHash('sha256')
      .update(this.password + this.passwordSalt)
      .digest('hex');
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    try {
      let opts: ValidatorOptions = { validationError: { target: false } };
      if (this.hasId()) opts = { ...opts, skipMissingProperties: true };
      await validateOrReject(this, opts);
    } catch (errs) {
      const error = new Error('Error validating User');
      (error as any).violations = errs;
      throw error;
    }
  }

  public hasValidPassword(password: string) {
    const passwordDigest = createHash('sha256').update(password + this.passwordSalt).digest('hex');
    return passwordDigest === this.passwordDigest;
  }
}
