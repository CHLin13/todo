import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Todo} from './todo.model';

@model({settings: {strict: true}})
export class Item extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string = '';

  @property({
    type: 'boolean',
    required: true,
  })
  isCompleted: boolean = false;

  @property({
    type: 'date',
  })
  completedAt?: string;

  @belongsTo(() => Todo)
  todoId: number = 0;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}
