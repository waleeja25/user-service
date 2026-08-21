import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { createAppLogger } from '@microservices/microservice-common';

import { grpcConfig } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createAppLogger(),
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: grpcConfig,
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  await app.listen(port ?? 3001);

  console.log(`User Service HTTP running on port ${port ?? 3001}`);
  console.log('User Service gRPC is running');
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
