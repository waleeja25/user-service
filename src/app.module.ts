import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule, createTypeOrmModuleConfig } from './config';
import { UserModule } from './user/user.module';

import { APP_FILTER } from '@nestjs/core';
import { GrpcExceptionFilter, DatabaseExceptionFilter } from './common';

@Module({
  imports: [
    AppConfigModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createTypeOrmModuleConfig,
    }),

    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GrpcExceptionFilter,
    },
  ],
})
export class AppModule {}
