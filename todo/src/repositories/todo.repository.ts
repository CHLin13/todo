import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Item} from '../models/item.model';
import {Todo} from '../models/todo.model';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {inject, Getter} from '@loopback/core';
import {ItemRepository} from './item.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id
> {
  public readonly items: HasManyRepositoryFactory<Item, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ItemRepository') getItemRepository: Getter<ItemRepository>,
  ) {
    super(Todo, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', getItemRepository);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
