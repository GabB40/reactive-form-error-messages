import { createSelector } from '@ngrx/store';
import { selectFeature } from './../../store/app.selectors';

export const selectChild1 = createSelector(
  selectFeature,
  ({ child1 }) => child1
);

export const selectChild1Name = createSelector(
  selectChild1,
  ({ name }) => name
);

export const selectChild1Version = createSelector(
  selectChild1,
  ({ version }) => version
);

export const selectChild1Todos = createSelector(
  selectChild1,
  ({ todos }) => todos
);

export const selectChild1Data = createSelector(
  selectChild1,
  ({ name, version, todos }) => ({ name, version, todos })
);