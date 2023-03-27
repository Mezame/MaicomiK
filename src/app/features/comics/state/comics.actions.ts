import { createAction, createActionGroup, props } from '@ngrx/store';
import { Comic } from '../comic';

export const LoadComicsAction = createAction('[Comic List Page] Load Comics');

export const ComicsAddEditActions = createActionGroup({
  source: 'Comic Add/Edit Page',
  events: {
    'Add Comic': props<{ comic: Readonly<Comic> }>(),
  },
});

export const ComicsApiActions = createActionGroup({
  source: 'Comics API',
  events: {
    'Retrieved Comic List': props<{ comics: readonly Comic[] }>(),

    'Added Comic': props<{ comic: Readonly<Comic> }>(),
  },
});
