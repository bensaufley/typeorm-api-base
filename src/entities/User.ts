import {
  Length,
  IsEmail,
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
  username: string;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar', { select: false })
  passwordDigest: string;

  @Column('varchar', { select: false })
  passwordSalt: string;
}
