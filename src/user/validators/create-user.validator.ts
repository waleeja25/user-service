import { UserProto } from 'microservices-proto';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCreateUserRequest(
  request: UserProto.CreateUserRequest,
): string | void {
  const errors: string[] = [];

  if (!request.name) {
    errors.push('Name is required');
  }

  if (!request.email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(request.email)) {
    errors.push('Invalid email format');
  }

  if (!request.password) {
    errors.push('Password is required');
  }

  if (errors.length) {
    return errors.join('; ');
  }
}
