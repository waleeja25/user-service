import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UserProto } from 'microservices-proto';

import { GrpcController } from '../common';
import { User } from './entities';
import { UserService } from './user.service';

function toProto(user: User): UserProto.User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

@Controller()
@GrpcController('UserService')
export class UserController implements UserProto.UserServiceController {
  constructor(private readonly userService: UserService) {}

  async create(
    @Payload() request: UserProto.CreateUserRequest,
  ): Promise<UserProto.User> {
    return toProto(await this.userService.create(request));
  }

  async getById(
    @Payload() request: UserProto.EntityIdRequest,
  ): Promise<UserProto.User> {
    return toProto(await this.userService.findById(request.id));
  }

  async update(
    @Payload() request: UserProto.UpdateUserRequest,
  ): Promise<UserProto.User> {
    return toProto(await this.userService.update(request.id, request));
  }

  async delete(@Payload() request: UserProto.EntityIdRequest): Promise<void> {
    await this.userService.delete(request.id);
  }

  async list(): Promise<UserProto.UserListResponse> {
    const users = await this.userService.list();

    return {
      data: users.map(toProto),
    };
  }
}
