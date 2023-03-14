import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap } from 'rxjs';
import { ComicsService } from '../comics.service';
import { ComicsApiActions, LoadComicsAction } from './comics.actions';
import { selectComics } from './comics.selectors';

@Injectable()
export class ComicEffects {
  loadComics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadComicsAction),
      concatLatestFrom(() => this.store.pipe(select(selectComics))),
      mergeMap(([_, comics]) => {
        if (comics?.length > 0) {
          return EMPTY;
        }

        return this.comicsService
          .getComics()
          .pipe(
            map((comics) => ComicsApiActions.retrievedComicList({ comics }))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private comicsService: ComicsService,
    private store: Store
  ) {}
}
