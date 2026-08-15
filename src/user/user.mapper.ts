import { UserProto } from 'microservices-proto';

import { User } from './entities';

export class UserMapper {
  static toResponse(user: User): UserProto.User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
