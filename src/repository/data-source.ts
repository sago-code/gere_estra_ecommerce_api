import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataSource } from 'typeorm';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/entities/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  synchronize: false,
});
