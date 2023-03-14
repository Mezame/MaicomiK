import { createAction, createActionGroup, props } from '@ngrx/store';
import { Comic } from '../comic';

export const LoadComicsAction = createAction('[Comic List Page] Load Comics');

export const ComicsActions = createActionGroup({
  source: 'Comics',
  events: {
    'Add Comics': props<{ comic: Comic }>(),
  },
});

export const ComicsApiActions = createActionGroup({
  source: 'Comics API',
  events: {
    'Retrieved Comic List': props<{ comics: readonly Comic[] }>(),

    'Added Comic': props<{ comic: Comic }>(),
  },
});
