import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { OracleConnectionOptions } from 'typeorm/driver/oracle/OracleConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const oracleConfig: OracleConnectionOptions & SeederOptions = {
  type: 'oracle',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  serviceName: process.env.DATABASE_SERVICE_NAME,
  synchronize: process.env.MODE === 'dev',
  entities: ['src/**/**.entity{.ts,.js}'],
  seeds: ['src/**/**.seed{.ts,.js}'],
  logging: true,
};

export const pgConfig: PostgresConnectionOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  synchronize: true,
  entities: ['src/**/**.entity{.ts,.js}'],
  seeds: ['src/**/**.seed{.ts,.js}'],
  logging: true,
};

export const dataSource = new DataSource(oracleConfig);
