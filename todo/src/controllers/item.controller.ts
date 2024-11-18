import {repository} from '@loopback/repository';
import {get, param, post, put, del, requestBody} from '@loopback/rest';
import {Item} from '../models';
import {ItemRepository} from '../repositories';
import {TodoRepository} from '../repositories';

export class ItemController {
  constructor(
    @repository(ItemRepository) public itemRepository: ItemRepository,
    @repository(TodoRepository) public todoRepository: TodoRepository,
  ) {}

  // 取得某 Todo 下所有的 Items
  @get('/todos/{todoId}/items')
  async findItemsByTodoId(
    @param.path.string('todoId') todoId: string,
  ): Promise<Item[]> {
    return this.itemRepository.find({where: {todoId: Number(todoId)}});
  }

  // 取得單一 Item by Id
  @get('/items/{id}')
  async findItemById(@param.path.string('id') id: string): Promise<Item> {
    return this.itemRepository.findById(Number(id));
  }

  // 新增 Item
  @post('/items')
  async createItem(@requestBody() item: Item): Promise<Item> {
    return this.itemRepository.create(item);
  }

  // 更新 Item by Id
  @put('/items/{id}')
  async updateItem(
    @param.path.string('id') id: string,
    @requestBody() item: Item,
  ): Promise<void> {
    await this.itemRepository.updateById(Number(id), item);
  }

  // 刪除 Item by Id
  @del('/items/{id}')
  async deleteItem(@param.path.string('id') id: string): Promise<void> {
    await this.itemRepository.deleteById(Number(id));
  }
}