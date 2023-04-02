import { createFeatureSelector } from '@ngrx/store';
import { appFeatureKey, FeatureState } from './index';

export const selectFeature = createFeatureSelector<FeatureState>(appFeatureKey);