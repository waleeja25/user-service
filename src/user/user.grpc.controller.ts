import { Controller } from '@nestjs/common';

import { GrpcController } from '../common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller()
@GrpcController('UserService')
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async getUserById(request: { id: number }) {
    return this.userService.findById(request.id);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  async deleteUser(request: { id: number }): Promise<void> {
    await this.userService.delete(request.id);
  }

  async listUsers() {
    const users = await this.userService.findAll();

    return {
      data: users,
    };
  }
}
