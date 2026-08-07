import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule, getTypeOrmConfig } from './config';
import { UserModule } from './user/user.module';

import { APP_FILTER } from '@nestjs/core';
import { GrpcExceptionFilter, DatabaseExceptionFilter } from './common';

@Module({
  imports: [
    AppConfigModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
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
