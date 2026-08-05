import 'reflect-metadata';

import { DataSource } from 'typeorm';

import {
  buildTypeOrmOptions,
  validateEnv,
  userValidationSchema,
  UserEnvironment,
} from '@microservices/config';

const env = validateEnv<UserEnvironment>(userValidationSchema);

export default new DataSource(
  buildTypeOrmOptions({
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.USER_DB_NAME,

    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
  }),
);
