import {service} from '@loopback/core';
import {TodoService} from '../services/todo.service';
import {repository} from '@loopback/repository';
import {TodoRepository, ItemRepository} from '../repositories';
import {post, param, get, requestBody, del, put} from '@loopback/rest';
import {Todo, Item} from '../models';

export class TodoController {
  constructor(
    @repository(ItemRepository) public itemRepository: ItemRepository,
    @repository(TodoRepository) public todoRepository: TodoRepository,
    @service(TodoService) public todoService: TodoService,
  ) {}

  @post('/todos')
  async createTodo(
    @requestBody() todoData: {todo: Todo, items: Item[]},
  ): Promise<Todo> {
    if (!todoData.todo || !todoData.items) {
      throw new Error("Todo or Items are missing");
    }
    const todo = await this.todoRepository.create(todoData.todo);

    for (let itemData of todoData.items) {
      console.log('Creating Item:', itemData);
      if (!itemData.content || itemData.isCompleted === undefined) {
        throw new Error("Item content or completion status is missing");
      }
        itemData.todoId = todo.id!;
        await this.itemRepository.create(itemData);
    }
  
    return todo;
  }

  @get('/todos')
  async findTodos(): Promise<Todo[]> {
    return this.todoRepository.find({include: ['items']});
  }

  @get('/todos/{id}')
  async findTodoById(@param.path.number('id') id: number): Promise<Todo> {
    return this.todoRepository.findById(id, {include: ['items']});
  }

  @put('/todos/{id}')
  async updateTodo(
    @param.path.number('id') id: number,
    @requestBody() todoData: Partial<Todo>,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todoData);
  }

  @del('/todos/{id}')
  async deleteTodo(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.updateById(id, {deleted: true});
  }
}
