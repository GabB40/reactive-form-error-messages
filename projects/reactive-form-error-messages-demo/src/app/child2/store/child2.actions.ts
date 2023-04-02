import { createAction, props } from '@ngrx/store';
import { Todo } from './../../models/app.interface';

export const incrementVersion = createAction(
  '[Child2] Increment Version'
);

export const updateData = createAction(
  '[Child2] Update Data',
  props<{ name: string; version: string; todos: Todo[] }>()
);