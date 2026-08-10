import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService, UserEmailExistsException } from '../common';
import { User } from './entities';
import type { CreateUserRequest, UpdateUserRequest } from './interfaces';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  override async create(createUserRequest: CreateUserRequest): Promise<User> {
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
    UpdateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    if (UpdateUserRequest.email) {
      const existingUser = await this.findOne({
        where: {
          email: UpdateUserRequest.email,
        },
      });

      if (existingUser && existingUser.id !== id) {
        throw new UserEmailExistsException();
      }
    }

    return super.update(id, UpdateUserRequest);
  }
}
