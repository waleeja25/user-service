import { Controller } from '@nestjs/common';

import { GrpcController } from '../common';

@Controller()
@GrpcController('UserService')
export class UserController {
  createUser() {}

  getUserById() {}

  updateUser() {}

  deleteUser() {}

  listUsers() {}
}
