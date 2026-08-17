import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UserProto } from 'microservices-proto';

import { GrpcController, Validate, validateEntityIdRequest } from '../common';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import {
  validateCreateUserRequest,
  validateUpdateUserRequest,
} from './validators';

@Controller()
@GrpcController('UserService')
export class UserController implements UserProto.UserServiceController {
  constructor(private readonly userService: UserService) {}

  async create(
    @Payload(Validate(validateCreateUserRequest))
    request: UserProto.CreateUserRequest,
  ): Promise<UserProto.User> {
    return UserMapper.toResponse(await this.userService.create(request));
  }

  async getById(
    @Payload(Validate(validateEntityIdRequest))
    request: UserProto.EntityIdRequest,
  ): Promise<UserProto.User> {
    return UserMapper.toResponse(await this.userService.findById(request.id));
  }

  async update(
    @Payload(Validate(validateUpdateUserRequest))
    request: UserProto.UpdateUserRequest,
  ): Promise<UserProto.User> {
    return UserMapper.toResponse(
      await this.userService.update(request.id, request),
    );
  }

  async delete(
    @Payload(Validate(validateEntityIdRequest))
    request: UserProto.EntityIdRequest,
  ): Promise<void> {
    await this.userService.delete(request.id);
  }

  async list(): Promise<UserProto.UserListResponse> {
    const users = await this.userService.list();

    return {
      data: users.map((user) => UserMapper.toResponse(user)),
    };
  }
}
