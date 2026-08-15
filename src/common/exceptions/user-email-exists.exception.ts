import { DomainException } from './domain.exception';
import { status as GrpcStatus } from '@grpc/grpc-js';
export class UserEmailExistsException extends DomainException {
  constructor() {
    super(
      'USER_EMAIL_EXISTS',
      'Email already exists',
      GrpcStatus.ALREADY_EXISTS,
    );
  }
}
