import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserProto } from 'microservices-proto';

import { BaseService, UserEmailExistsException } from '../common';
import { User } from './entities';
import { RabbitMQService } from '../rabbitmq';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,

    private readonly rabbitMQService: RabbitMQService,
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

    const user = await super.create(createUserRequest);

    this.logger.log(`User ${user.id} created successfully`);

    await this.rabbitMQService.publishUserCreated({ userId: user.id });

    return user;
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

    const user = await super.update(id, updateUserRequest);

    this.logger.log(`User ${id} updated successfully`);

    return user;
  }

  override async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.softDelete(id);

    this.logger.log(`User ${id} deleted successfully`);
  }
}
