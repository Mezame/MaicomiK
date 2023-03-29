import { createAction, createActionGroup, props } from '@ngrx/store';
import { Comic } from '../comic';

export const loadComicsAction = createAction('[Comic List Page] Load Comics');

export const ComicAddAction = createAction(
  '[Comic Add Page] Add Comic',
  props<{ comic: Partial<Comic> }>()
);

export const ComicEditAction = createAction(
  '[Comic Edit Page] Edit Comic',
  props<{ comic: Readonly<Comic> }>()
);

export const incrementComicChapterAction = createAction(
  '[Comic Detail Page] Increment Comic Chapter',
  props<{ comic: Readonly<Comic>, fields: Partial<Comic> }>()
);

export const ComicsApiActions = createActionGroup({
  source: 'Comics API',
  events: {
    'Retrieved Comic List': props<{ comics: readonly Comic[] }>(),

    'Added Comic': props<{ comic: Readonly<Comic> }>(),

    'Updated Comic': props<{ comic: Readonly<Comic> }>(),
  },
});
