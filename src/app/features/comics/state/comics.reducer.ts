import { createReducer, on } from '@ngrx/store';

import { ComicsApiActions } from './comics.actions';
import { Comic } from '../comic';

export const initialState: readonly Comic[] = [];

export const comicsReducer = createReducer(
  initialState,
  on(ComicsApiActions.retrievedComicList, (_state, { comics }) => comics)
);
