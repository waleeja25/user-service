import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createTypeOrmConfig } from '@microservices/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) =>
        createTypeOrmConfig(
          configService,
          configService.getOrThrow<string>('database.userDatabase'),
        ),
    }),
  ],
})
export class UserServiceModule {}
