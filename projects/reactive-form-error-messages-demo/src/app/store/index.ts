import { combineReducers } from '@ngrx/store';
import { child1FeatureKey, child1Reducer, Child1State } from './../child1/store/index';
import { child2FeatureKey, child2Reducer, Child2State } from './../child2/store/index';

export const appFeatureKey = 'app';

export interface FeatureState {
  [child1FeatureKey]: Child1State,
  [child2FeatureKey]: Child2State
}

export interface AppState {
  [appFeatureKey]: FeatureState;
}

export const appReducer = combineReducers({
  [child1FeatureKey]: child1Reducer,
  [child2FeatureKey]: child2Reducer
});
