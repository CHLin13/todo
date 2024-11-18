import {Entity, hasMany, model, property} from '@loopback/repository';
import { Item } from './item.model';

@model()
export class Todo extends Entity {
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
  title: string;

  @property({
    type: 'string',
  })
  subtitle?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'boolean',
  })
  deleted?: boolean;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

