import { join } from 'path';

export const GRPC_PACKAGE = {
  USER: 'user',
} as const;

export const PROTO_PATH = {
  USER: join(process.cwd(), '../microservices-proto/proto/user.proto'),
} as const;
