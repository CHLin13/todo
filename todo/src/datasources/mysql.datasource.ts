import {juggler} from '@loopback/repository';

const config = {
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123123',
  database: 'todo',
};

export class MysqlDataSource extends juggler.DataSource {
  static dataSourceName = 'mysql';
  constructor() {
    super(config);
  }
}
