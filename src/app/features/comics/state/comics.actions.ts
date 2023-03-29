import { createAction, createActionGroup, props } from '@ngrx/store';
import { Comic } from '../comic';

export const LoadComicsAction = createAction('[Comic List Page] Load Comics');

export const ComicAddAction = createAction('[Comic Add Page] Add Comic', props<{ comic: Partial<Comic> }>());

export const ComicEditAction = createAction('[Comic Edit Page] Edit Comic', props<{ comic: Readonly<Comic> }>());

export const ComicsApiActions = createActionGroup({
  source: 'Comics API',
  events: {
    'Retrieved Comic List': props<{ comics: readonly Comic[] }>(),

    'Added Comic': props<{ comic: Readonly<Comic> }>(),

    'Updated Comic': props<{ comic: Readonly<Comic> }>(),
  },
});
