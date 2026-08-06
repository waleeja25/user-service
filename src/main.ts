import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { grpcConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: grpcConfig.package,
        protoPath: grpcConfig.protoPath,
        url: grpcConfig.url,
      },
    },
  );

  await app.listen();

  console.log('User Service is running');
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
