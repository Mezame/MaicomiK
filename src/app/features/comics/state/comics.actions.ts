import { createActionGroup, props } from '@ngrx/store';
import { Comic } from '../comic';

export const ComicsApiActions = createActionGroup({
  source: 'Comics API',
  events: {
    'Retrieved Comic List': props<{ comics: readonly Comic[] }>(),
  },
});
