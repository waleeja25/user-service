import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { createTypeOrmConfig } from './typeorm.config';

export function createTypeOrmModuleConfig(
  config: ConfigService,
): TypeOrmModuleOptions {
  return createTypeOrmConfig({
    host: config.getOrThrow<string>('database.host'),
    port: config.getOrThrow<number>('database.port'),
    username: config.getOrThrow<string>('database.username'),
    password: config.getOrThrow<string>('database.password'),
    database: config.getOrThrow<string>('database.database'),

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [],
  });
}
