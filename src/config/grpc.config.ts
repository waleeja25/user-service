import { GRPC_PACKAGE, PROTO_PATH } from '../common';

export const grpcConfig = {
  package: GRPC_PACKAGE.USER,
  protoPath: PROTO_PATH.USER,
  url: process.env.GRPC_URL,
} as const;
