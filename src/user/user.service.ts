import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserProto } from 'microservices-proto';

import { BaseService, UserEmailExistsException } from '../common';
import { User } from './entities';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  override async create(
    createUserRequest: UserProto.CreateUserRequest,
  ): Promise<User> {
    const existingUser = await this.findOne({
      where: {
        email: createUserRequest.email,
      },
    });

    if (existingUser) {
      throw new UserEmailExistsException();
    }

    return super.create(createUserRequest);
  }

  override async update(
    id: number,
    updateUserRequest: UserProto.UpdateUserRequest,
  ): Promise<User> {
    if (updateUserRequest.email) {
      const existingUser = await this.findOne({
        where: {
          email: updateUserRequest.email,
        },
      });

      if (existingUser && existingUser.id !== id) {
        throw new UserEmailExistsException();
      }
    }

    return super.update(id, updateUserRequest);
  }

  override async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete(id);
  }
}
