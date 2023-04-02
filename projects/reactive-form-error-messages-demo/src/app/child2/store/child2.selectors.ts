import { createSelector } from '@ngrx/store';
import { selectFeature } from './../../store/app.selectors';

export const selectChild2 = createSelector(
  selectFeature,
  ({ child2 }) => child2
);

export const selectChild2Name = createSelector(
  selectChild2,
  ({ name }) => name
);

export const selectChild2Version = createSelector(
  selectChild2,
  ({ version }) => version
);

export const selectChild2Todos = createSelector(
  selectChild2,
  ({ todos }) => todos
);

export const selectChild2Data = createSelector(
  selectChild2,
  ({ name, version, todos }) => ({ name, version, todos })
);

