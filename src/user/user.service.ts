import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../common';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  override async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.repository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return super.create(createUserDto);
  }

  override async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.email) {
      const existingUser = await this.repository.findOne({
        where: {
          email: updateUserDto.email,
        },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    return super.update(id, updateUserDto);
  }
}
