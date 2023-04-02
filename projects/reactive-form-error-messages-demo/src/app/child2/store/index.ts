import { createReducer, on } from '@ngrx/store';
import { Todo } from './../../models/app.interface';
import { incrementVersion, updateData } from './child2.actions';

export const child2FeatureKey = 'child2';
export interface Child2State {
  name: string;
  version: string;
  todos: Todo[];
}

export const initialState: Child2State = {
  name: child2FeatureKey,
  version: '0',
  todos: [
    { todo: 'Better Code', priority: 5 }
  ]
};

export const child2Reducer = createReducer(
  initialState,
  on(incrementVersion, (state) => ({
    ...state,
    version: state.version + 1
  })),
  on(updateData, (state, data) => ({
    ...state,
    ...data
  }))
);
