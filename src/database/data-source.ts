import 'reflect-metadata';

import { DataSource } from 'typeorm';

import {
  createTypeOrmConfig,
  envValidationSchema,
  validateEnv,
} from '../config';

interface EnvironmentVariables {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

const env = validateEnv<EnvironmentVariables>(envValidationSchema);

export default new DataSource(
  createTypeOrmConfig({
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
  }),
);
