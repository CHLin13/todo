import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';

@model({settings: {strict: true}})
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
  title: string = '';

  @property({
    type: 'string',
  })
  subtitle?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['ACTIVE', 'INACTIVE'],
    },
  })
  status: string = 'ACTIVE';

  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;

  @hasMany(() => Item)
  items: Item[] = [];

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}
