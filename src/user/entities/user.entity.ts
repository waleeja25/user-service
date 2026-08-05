import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@microservices/common';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password!: string;
}
