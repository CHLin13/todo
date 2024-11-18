import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {TodoRepository} from '../repositories';
import {Todo, Item} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class TodoService {
  constructor(
    @repository(TodoRepository) public todoRepository: TodoRepository,
  ) {}

  async createTodoWithItems(todoData: Todo, itemsData: Item[]): Promise<Todo> {
    const todo = await this.todoRepository.create(todoData);
    for (const item of itemsData) {
      await this.todoRepository.items(todo.id!).create(item);
    }
    return todo;
  }
}
