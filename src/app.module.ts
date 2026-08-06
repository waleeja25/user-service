import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule, createTypeOrmModuleConfig } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createTypeOrmModuleConfig,
    }),

    UserModule,
  ],
})
export class AppModule {}
