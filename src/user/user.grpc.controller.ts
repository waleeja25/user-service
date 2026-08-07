import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GrpcController, EntityIdDto } from '../common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller()
@GrpcController('UserService')
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  async create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async getById(@Payload() request: EntityIdDto) {
    return this.userService.findById(request.id);
  }

  async update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  async delete(@Payload() request: EntityIdDto): Promise<void> {
    await this.userService.delete(request.id);
  }

  async list() {
    const users = await this.userService.findAll();

    return {
      data: users,
    };
  }
}
