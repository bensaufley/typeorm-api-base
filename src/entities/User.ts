import {
  IsDefined,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', { length: 32 })
  @Length(8, 32)
  @IsDefined()
  @Matches(/^[a-z](?!.*[.-]{2,})[a-z0-9.-]+[a-z0-9]$/i, {
    message: 'username must begin with a letter, end with a letter or ' +
      'number, and consist of letters, numbers, dashes and periods',
  })
  username: string;

  @Column('varchar')
  @IsEmail()
  @IsDefined()
  email: string;

  @Column('varchar', { select: false })
  passwordDigest: string;

  @Column('varchar', { select: false })
  passwordSalt: string;

  @Length(12, 64)
  @IsDefined()
  password: string;
}
