import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

export class MysqlDataSource extends juggler.DataSource {
  static dataSourceName = 'mysql';
  constructor() {
    super(config);
  }
}
