import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

import { GrpcController } from '../common';

import type {
  CreateUserRequest,
  UpdateUserRequest,
  EntityIdRequest,
} from '../common';

import { UserService } from './user.service';

@Controller()
@GrpcController('UserService')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(@Payload() request: CreateUserRequest) {
    return this.userService.create(request);
  }

  async getById(@Payload() request: EntityIdRequest) {
    return this.userService.findById(request.id);
  }

  async update(@Payload() request: UpdateUserRequest) {
    return this.userService.update(request.id, request);
  }

  async delete(@Payload() request: EntityIdRequest): Promise<void> {
    await this.userService.delete(request.id);
  }

  async list() {
    const users = await this.userService.list();

    return {
      data: users,
    };
  }
}
