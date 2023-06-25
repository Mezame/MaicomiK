import { createAction, createActionGroup, props } from '@ngrx/store';
import { Comic } from '../models';

export const loadComicsAction = createAction('[Comic List Page] Load Comics');

export const addComicAction = createAction(
  '[Comic Add Page] Add Comic',
  props<{ comic: Partial<Comic> }>()
);

export const editComicAction = createAction(
  '[Comic Edit Page] Edit Comic',
  props<{ comic: Comic }>()
);

export const deleteComicAction = createAction(
  '[Comic Detail Page] Delete Comic',
  props<{ id: string }>()
);

export const incrementComicChapterAction = createAction(
  '[Comic Detail Page] Increment Comic Chapter',
  props<{ comic: Comic; fields: Partial<Comic> }>()
);

export const ComicsApiActions = createActionGroup({
  source: 'Comics API',
  events: {
    'Got Comics': props<{ comics: readonly Comic[] }>(),

    'Added Comic': props<{ comic: Readonly<Comic> }>(),

    'Updated Comic': props<{ comic: Readonly<Comic> }>(),

    'Deleted Comic': props<{ id: string }>(),
  },
});
