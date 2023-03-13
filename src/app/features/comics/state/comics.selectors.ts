import { createFeatureSelector } from '@ngrx/store';
import { Comic } from '../comic';

export const selectComics = createFeatureSelector<readonly Comic[]>('comics');
