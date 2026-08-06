import { DataSourceOptions } from 'typeorm';

interface TypeOrmConfigOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  migrations: string[];
}

export function createTypeOrmConfig({
  host,
  port,
  username,
  password,
  database,
  entities,
  migrations,
}: TypeOrmConfigOptions): DataSourceOptions {
  return {
    type: 'mysql',

    host,
    port,
    username,
    password,
    database,

    entities,
    migrations,

    synchronize: false,
    migrationsRun: false,
  };
}
