import { join } from 'path';

export const grpcConfig: {
  package: string;
  url: string | undefined;
  protoPath: string;
} = {
  package: 'user',
  url: process.env.GRPC_URL,
  protoPath: join(process.cwd(), '../microservices-proto/proto/user.proto'),
};
