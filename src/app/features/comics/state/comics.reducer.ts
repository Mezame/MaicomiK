import { createReducer, on } from '@ngrx/store';

import { ComicsApiActions } from './comics.actions';
import { Comic } from '../comic';

export const initialState: readonly Comic[] = [];

export const comicsReducer = createReducer(
  initialState,
  on(ComicsApiActions.retrievedComicList, (_state, { comics }) => comics),

  on(ComicsApiActions.addedComic, (state, { comic }) => {
    let newState: readonly Comic[];

    newState = [...state, comic];

    return newState;
  }),

  on(ComicsApiActions.updatedComic, (state, { comic }) => {
    let newState: readonly Comic[];

    newState = state.filter((c) => c.metadata.id != comic.metadata.id);

    newState = [...state, comic];

    return newState;
  }),

  on(ComicsApiActions.deletedComic, (state, { id }) => {
    let newState: readonly Comic[];

    newState = state.filter((c) => c.metadata.id != id);

    return newState;
  }),
);
