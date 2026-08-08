import { DomainException } from './domain.exception';

export class UserEmailExistsException extends DomainException {
  constructor() {
    super('USER_EMAIL_EXISTS', 'Email already exists');
  }
}
