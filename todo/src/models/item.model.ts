import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Todo } from './todo.model';

@model()
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
  content: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCompleted: boolean;

  @property({
    type: 'date',
  })
  completedAt?: string;

  @belongsTo(() => Todo)
  todoId: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

