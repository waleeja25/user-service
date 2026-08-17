import { UserProto } from 'microservices-proto';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUpdateUserRequest(
  request: UserProto.UpdateUserRequest,
): string | void {
  const errors: string[] = [];

  if (!request.id || request.id <= 0) {
    errors.push('Id must be a positive integer');
  }

  if (request.name !== undefined && !request.name) {
    errors.push('Name cannot be empty');
  }

  if (request.email !== undefined) {
    if (!request.email) {
      errors.push('Email cannot be empty');
    } else if (!EMAIL_REGEX.test(request.email)) {
      errors.push('Invalid email format');
    }
  }

  if (request.password !== undefined && !request.password) {
    errors.push('Password cannot be empty');
  }

  if (errors.length) {
    return errors.join('; ');
  }
}
