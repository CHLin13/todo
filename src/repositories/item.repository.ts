import {DefaultCrudRepository, BelongsToAccessor} from '@loopback/repository';
import {Item} from '../models/item.model';
import {Todo} from '../models/todo.model';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {inject} from '@loopback/core';
import {repository, Getter} from '@loopback/repository';
import {TodoRepository} from '../repositories';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id
> {
  public readonly todo: BelongsToAccessor<Todo, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('TodoRepository') getTodoRepository: Getter<TodoRepository>,
  ) {
    super(Item, dataSource);
    this.todo = this.createBelongsToAccessorFor('todo', getTodoRepository);
    this.registerInclusionResolver('todo', this.todo.inclusionResolver);
  }
}
