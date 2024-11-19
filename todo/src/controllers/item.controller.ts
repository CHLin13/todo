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

  @get('/todos/{todoId}/items')
  async findItemsByTodoId(
    @param.path.string('todoId') todoId: string,
  ): Promise<Item[]> {
    return this.itemRepository.find({where: {todoId: Number(todoId)}});
  }

  @get('/items/{id}')
  async findItemById(@param.path.string('id') id: string): Promise<Item> {
    return this.itemRepository.findById(Number(id));
  }

  @post('/items')
  async createItem(@requestBody() item: Item): Promise<Item> {
    return this.itemRepository.create(item);
  }

  @put('/items/{id}')
  async updateItem(
    @param.path.string('id') id: string,
    @requestBody() item: Item,
  ): Promise<void> {
    await this.itemRepository.updateById(Number(id), item);
  }

  @del('/items/{id}')
  async deleteItem(@param.path.string('id') id: string): Promise<void> {
    await this.itemRepository.deleteById(Number(id));
  }
}